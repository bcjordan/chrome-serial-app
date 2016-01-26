'use strict';

var React = require('react');

function bestDeviceOption(devices) {
  const matches = devices.filter((d) => d.path.match(/tty\.usbserial/));
  return matches.length ? matches[0] : devices[0];
}

var DevicesList = React.createClass({

  getInitialState: function(){
    return {
      selectedDevice: bestDeviceOption(this.props.devices).path
    };
  },

  getDefaultProps: function(){
    return {
      devices: []
    }
  },

  onChange: function(e){
    console.log(e);
    this.setState({
      selectedDevice: e.target.value
    });
  },

  render: function(){
    var options = this.props.devices.map(function(device){
      var text = device.path;
      if(device.productId === 67 && device.vendorId === 9025){ // uno
        text += '(Arduino Uno)';
      }
      if (device.path.match(/tty\.usbserial/)) {
        console.log("Found USB serial!");
      }

      return (
        <option key={device.path} value={device.path}>{text}</option>
      );
    });

    return (
      <select value={this.state.selectedDevice} onChange={this.onChange} className="form-control">
        {options}
      </select>
    );
  }
});

module.exports = DevicesList;
