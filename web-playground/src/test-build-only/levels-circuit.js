window.circuitLevels = {
  1: {
    instructions: "Turn the LED on.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode: `led.on();`
  },
  2: {
    instructions: "Let's turn an LED on, then off after 1 second.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode: `led.on();
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

    solutionCode: `led.blink();`
  },
  4: {
    instructions: "Now try turning on pixel zero",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode: `pixels[0].on()`
  },
  5: {
    instructions: "Now try flashing crazy colors",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode: `
var index = 0;
var colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
];

setInterval(() => {
  pixels.forEach(pixel => pixel.color(colors[index]));
  pixels.forEach(pixel => pixel.intensity(20));

  if (++index === colors.length) {
    index = 0;
  }
}, 100);
`
  },
  6: {
    instructions: "Now try button press handling",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode: `buttonL.on('down', function() { led.on(); });`
  },
  7: {
    instructions: "Now also make releasing the button turn the LED off.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode: `buttonL.on('down', function() { led.on(); });
buttonL.on('up', function() { led.off(); });
`
  },
  8: {
    instructions: "Now make the L button turn on LED 0, and the R turn on LED 9.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode: `

buttonL.on('down', function() { pixels[0].on(); });
buttonL.on('up', function() { pixels[0].off(); });
buttonR.on('down', function() { pixels[9].on(); });
buttonR.on('up', function() { pixels[9].off(); });

`
  },

  9: {
    instructions: "Now make switch on the left make LED 0 red, and to the right, make LED 0 green.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode: `
toggle.on('close', function() {
  pixels[9].off();
  pixels[0].on();
  for(var i = 1; i < 4; i++) {
    setTimeout(function(i) {pixels[i].on()}.bind(this, i), i * 50)
    setTimeout(function(i) {pixels[i].off()}.bind(this, i), i * 50 + 50)
  }

});
toggle.on('open', function() {
  pixels[0].off();
  pixels[9].on();
  for(var i = 1; i < 4; i++) {
    setTimeout(function(i) {pixels[9-i].on()}.bind(this, i), i * 50)
    setTimeout(function(i) {pixels[9-i].off()}.bind(this, i), i * 50 + 50)
  }

});

`
  },

  10: {
    instructions: "Now play a note.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode: `
piezo.frequency(250, 200);
`
  },

  11: {
    instructions: "Now play a song.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode: `
  piezo.play({
    // song is composed by an array of pairs of notes and beats
    // The first argument is the note (null means "no note")
    // The second argument is the length of time (beat) of the note (or non-note)
    song: [
      ["C4", 1 / 4],
      ["D4", 1 / 4],
      ["F4", 1 / 4],
      ["D4", 1 / 4],
      ["A4", 1 / 4],
      [null, 1 / 4],
      ["A4", 1],
      ["G4", 1],
      [null, 1 / 2],
      ["C4", 1 / 4],
      ["D4", 1 / 4],
      ["F4", 1 / 4],
      ["D4", 1 / 4],
      ["G4", 1 / 4],
      [null, 1 / 4],
      ["G4", 1],
      ["F4", 1],
      [null, 1 / 2]
    ],
    tempo: 100
  });
`
  }
};


