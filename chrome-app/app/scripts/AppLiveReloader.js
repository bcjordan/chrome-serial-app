/**
 * @file Reload client for Chrome Apps & Extensions.
 *
 * The reload client has compatibility with livereload, but only the
 * reload command.
 */

export default class AppLiveReloader {
  constructor({chromeRuntime, host, port}) {
    var connection = new WebSocket('ws://' + host + ':' + port + '/livereload');

    connection.onerror = function (error) {
      console.log(`Reload connection error: ${JSON.stringify(error)}`);
    };

    connection.onmessage = (e) => {
      if (e.data) {
        var data = JSON.parse(e.data);
        if (data && data.command === 'reload') {
          this.reload(chromeRuntime);
        }
      }
    };
  }

  reload(chromeRuntime) {
    chromeRuntime.reload();
  }
}
