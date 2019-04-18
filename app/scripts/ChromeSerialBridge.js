/**
 * @file Serial port bridge
 *
 * Wrapping of Chrome app portion of chrome-serialport.
 * @see https://github.com/jacobrosenthal/chrome-serialport/blob/master/main.js
 */
'use strict';

import SerialPort from 'browser-serialport';

export default class ChromeSerialBridge {
  constructor(chrome) {
    console.log("Constructing serial bridge.");

    /**
     * @type {SerialPort}
     */
    var serialPort; // initialized during onMessageExternal 'construct' command

    /**
     * Sets up two channels of communication:
     *
     * # "port/connect/data" (onConnectExternal): opens up a port of communication
     *   with the client webpage, forwarding serial data
     *
     * Serial -> web client port.postMessage
     *   - disconnect -> onDisconnect
     *   - error -> onError
     *   - close -> onClose
     *   - data -> data
     *   Web client port.onMessage -> serial
     *   - msg.data -> serial
     *   - onDisconnect -> close serial port
     * # "message/command" (onMessageExternal): one off commands
     *
     * Web client onMessage -> resp.(data|error)
     *   - list
     *   - getManifest
     *   - list
     *   - construct{path:, options:} -> connects to given serial port
     *   - open
     *   - close
     *   - drain
     *   - flush
     */

    var ports = [];
    var queue = [];

    chrome.runtime.onConnectExternal.addListener(function (port) {
      ports.push(port);
      console.log('socket opened');

      serialPort.on('disconnect', function (err) {
        console.log('serialport disconnected', err);
        var resp = {};
        resp.op = 'onDisconnect';
        port.postMessage(resp);
      });

      //collapse into .error field?
      serialPort.on('error', function (err) {
        console.log('serialport errored', err);
        var resp = {};
        resp.op = 'onError';
        port.postMessage(resp);
      });

      serialPort.on('close', function () {
        console.log('serialport closed');
        // let other end emit close when it notices port disconnect
        var resp = {};
        resp.op = 'onClose';
        port.postMessage(resp);
      });

      serialPort.on('data', function (data) {
        var resp = {};
        resp.op = 'data';
        resp.data = data;
        port.postMessage(resp);
      });

      function trySend(buffer) {
        if (buffer) {
          queue.push(buffer);
        }

        if (queue.length === 0) {
          // Exhausted pending send buffer.
          return;
        }

        if (queue.length > 512) {
          throw new Error('Send queue is full! More than 512 pending messages.');
        }

        var toSend = queue.shift();
        serialPort.write(toSend, function (err, results) {
          if (results.error) {
            queue.unshift(toSend);
          }

          if (queue.length !== 0) {
            setTimeout(trySend, 0);
          }
        });
      }

      port.onMessage.addListener(function (msg) {
        //check for string as well? or force buffer sends from other side...
        if (msg && msg.hasOwnProperty('data')) {
          var buffer = new Buffer(msg.data);
          trySend(buffer);
        }
      });

      port.onDisconnect.addListener(function () {
        console.log('socket disconnected');
        queue.length = 0;
        var portIndex = ports.indexOf(port);
        if (portIndex != -1) {
          ports.splice(portIndex, 1);
          serialPort.close();
        }
      });

    });

    //command channel
    chrome.runtime.onMessageExternal.addListener(function (msg, sender, responder) {

      console.log(msg);

      var cmds = {
        getManifest: function () {
          var resp = {};
          resp.data = chrome.runtime.getManifest();
          responder(resp);
        },
        list: function () {
          SerialPort.list(function (err, data) {
            console.log(msg.op, 'err:', err, data);
            var resp = {};
            if (err) {
              resp.error = err.message;
            }
            if (data) {
              resp.data = data;
            }
            responder(resp);
          });
        },
        construct: function () {
          console.log('construct');
          if (serialPort) {
            console.log('Already connected, closing out.');
            serialPort.flush(function (err, data) {
              console.log('Flush completed.');
              serialPort.close(function () {
                console.log('Close completed.');
                constructNewPort();
                // Notify connected ports they are done.
                var copiedPortList = ports.slice();
                console.log("Port length is " + ports.length);
                for (var i = 0; i < copiedPortList.length; i++) {
                  var portIndex = ports.indexOf(copiedPortList[i]);
                  if (portIndex != -1) {
                    ports.splice(portIndex, 1);
                  }
                  copiedPortList[i].postMessage({
                    op: 'onDisconnect'
                  });
                }
                ports.length = 0;
              });
            });

            console.log('Already connected, closing out.');
          } else {
            constructNewPort();
          }

          function constructNewPort () {
            var resp = {};
            serialPort = new SerialPort.SerialPort(msg.path, msg.options, false, function (err) {
              console.log(msg.op, 'err:', err);
              if (err) {
                resp.error = err.message;
              }
            });
            responder(resp);
          }
        },
        open: function () {
          serialPort.open(function (err) {
            console.log(msg.op, 'err:', err);
            var resp = {};
            if (err) {
              resp.error = err.message;
            }
            responder(resp);
          });
        },
        close: function () {
          serialPort.close(function (err) {
            console.log(msg.op, 'err:', err);
            var resp = {};
            if (err) {
              resp.error = err.message;
            }
            responder(resp);
          });
        },
        drain: function () {
          serialPort.drain(function (err, data) {
            console.log(msg.op, 'err:', err, data);
            var resp = {};
            if (err) {
              resp.error = err.message;
            }
            if (data) {
              resp.data = data;
            }
            responder(resp);
          });
        },
        flush: function () {
          serialPort.flush(function (err, data) {
            console.log(msg.op, 'err:', err, data);
            var resp = {};
            if (err) {
              resp.error = err.message;
            }
            if (data) {
              resp.data = data;
            }
            responder(resp);
          });
        }
      };

      if (!cmds.hasOwnProperty(msg.op)) {
        return responder({error: 'Unknown op'});
      }

      console.log(`Received message with operation ${msg.op}`);

      cmds[msg.op]();

      return true; // required if we want to respond after the listener
    });
  }
}
