window.demoLevels = {
  1: {
    instructions: "Turn the LED on.",

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
    instructions: "Now try blinking the LED using the led.blink() method",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode:
`led.blink();`
  },
  4: {
    instructions: "Now try making it blink slower (every second) by passing a timeout parameter",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode:
`led.blink(1000);`
  },
  5: {
    instructions: "Make the button trigger the LED on.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode:
`button.on('down', function() { led.on(); });`
  },
  6: {
    instructions: "Now also make releasing the button turn the LED off.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode:
`button.on('down', function() { led.on(); });
button.on('up', function() { led.off(); });
`,
    startingCode:
`button.on('down', function() { led.on(); });
`
  },
  7: {
    instructions: "Now let's turn the RGB LED on and set it to the color red (#FF0000).",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode:
`ledRGB.on();
ledRGB.color("#FF0000");`
  },
  8: {
    instructions: "Now let's make pressing the button down make the RGB LED turn blue, and make it green when it's up.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode:
`ledRGB.on();

button.on('down', function () { ledRGB.color("#0000FF") });
button.on('up', function () { ledRGB.color("#00FF00") });
`,
    startingCode:
`ledRGB.on();
`
  },
  9: {
    instructions: "Now make moving the slider change the RGB LED's intensity.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    startingCode:
`ledRGB.on();
ledRGB.intensity(0);
ledRGB.color("#FF0000");

slider.scale([0, 100]).on("slide", function () {
  // this.value is the slider's position from 0-100
});
`,
    solutionCode:
`ledRGB.on();
ledRGB.intensity(0);
ledRGB.color("#FF0000");

slider.scale([0, 100]).on("slide", function () {
  ledRGB.intensity(this.value);
});
`
  },
  10: {
    instructions: "Now make speaking into the microphone change the RGB LED's intensity.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    startingCode:
`microphone.scale(0, 100).on('change', function(){
  // this.value is the microphone's intensity from 0 to 100
});
`,
    solutionCode:
`microphone.scale(0, 100).on('change', function(){
  ledRGB.intensity(this.value);
});
`
  },

};


