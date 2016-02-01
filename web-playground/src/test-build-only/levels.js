window.demoLevels = {
  1: {
    instructions: "Let's turn an LED on.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode:
`led.on();`
  },
  2: {
    instructions: "Let's turn an LED on, then off after 1 second.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode:
`led.on();
window.setTimeout(function() {
  led.off();
}, 1000);
`
  },
  3: {
    instructions: "Let's blink this LED!",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode:
`led.blink();`
  },
  4: {
    instructions: "Make the button trigger the LED on.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode:
`button.on('down', function() { led.on(); });`
  },
  5: {
    instructions: "Now make releasing the button turn the LED off.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode:
`
button.on('down', function() { led.on(); });
button.on('up', function() { led.off(); });
`
  },
  6: {
    instructions: "Now make moving the slider change the RGB LED's intensity.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode:
`ledRGB.on();
ledRGB.color("#FF0000");

button.on('down', function () { ledRGB.color("#FFFFFF") });
button.on('up', function () { ledRGB.color("#00FF00") });

slider.scale([0, 180]).on("slide", function () {
  ledRGB.intensity(this.value);
});
`
  },

};


