window.demoLevels = {
  1: {
    instructions: "Make the LED blink!",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode:
        `
var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function () {
  var ledRGB = new five.Led.RGB({
    pins: {
      red: 9,
      green: 10,
      blue: 11
    }
  });

  ledRGB.on();
  ledRGB.color("#FF0000");

  var slider = new five.Sensor("A3");
  var button = new five.Button("12");

  button.on('down', function () { ledRGB.color("#FFFFFF") });
  button.on('up', function () { ledRGB.color("#00FF00") });

  slider.scale([0, 180]).on("slide", function () {
  ledRGB.intensity(this.value);
  });

});

board.on('error', function (err) {
  console.log('Board-reported error: ' + err);
});
`
  },
};
