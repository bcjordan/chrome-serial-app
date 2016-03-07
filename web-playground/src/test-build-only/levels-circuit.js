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
  },

  12: {
    instructions: "Now play another song.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode: `
piezo.play({
  song: [
    ["A", 500],
    [null, 50],
    ["A", 500],
    [null, 50],
    ["A", 500],
    [null, 50],
    ["F", 350],
    [null, 50],
    ["C5", 150],
    [null, 50],
    ["A", 500],
    [null, 50],
    ["F", 350],
    [null, 50],
    ["C5", 150],
    [null, 50],
    ["A", 650],
    [null, 50],
    [null, 500],
    ["E5", 500],
    [null, 50],
    ["E5", 500],
    [null, 50],
    ["E5", 500],
    [null, 50],
    ["F5", 350],
    [null, 50],
    ["C5", 150],
    [null, 50],
    ["G4", 500],
    [null, 50],
    ["F", 350],
    [null, 50],
    ["C5", 150],
    [null, 50],
    ["A", 650],
    [null, 50],
    [null, 500],

    ["A5", 500],
    [null, 50],
    ["A", 300],
    [null, 50],
    ["A", 150],
    [null, 50],
    ["A5", 500],
    [null, 50],
    ["G#5", 325],
    [null, 50],
    ["G5", 175],
    [null, 50],
    ["F#5", 125],
    [null, 50],
    ["F5", 125],
    [null, 50],
    ["F#5", 250],
    [null, 50],
    [null, 325],
    ["A4", 250],
    [null, 50],
    ["D#5", 500],
    [null, 50],
    ["D5", 325],
    [null, 50],
    ["C#5", 175],
    [null, 50],
    ["C5", 125],
    [null, 50],
    ["B", 125],
    [null, 50],
    ["C5", 250],
    [null, 50],
    [null, 350],

    ["F", 250],
    [null, 50],
    ["G4", 500],
    [null, 50],
    ["F", 350],
    [null, 50],
    ["A", 125],
    [null, 50],
    ["C5", 500],
    [null, 50],
    ["A", 375],
    [null, 50],
    ["C5", 125],
    [null, 50],
    ["E5", 650],
    [null, 50],
    [null, 500],

    ["A5", 500],
    [null, 50],
    ["A", 300],
    [null, 50],
    ["A", 150],
    [null, 50],
    ["A5", 500],
    [null, 50],
    ["G#5", 325],
    [null, 50],
    ["G5", 175],
    [null, 50],
    ["F#5", 125],
    [null, 50],
    ["F5", 125],
    [null, 50],
    ["F#5", 250],
    [null, 50],
    [null, 325],
    ["A4", 250],
    [null, 50],
    ["D#5", 500],
    [null, 50],
    ["D5", 325],
    [null, 50],
    ["C#5", 175],
    [null, 50],
    ["C5", 125],
    [null, 50],
    ["B", 125],
    [null, 50],
    ["C5", 250],
    [null, 50],
    [null, 350],

    ["F", 250],
    [null, 50],
    ["G4", 500],
    [null, 50],
    ["F", 375],
    [null, 50],
    ["C5", 125],
    [null, 50],
    ["A", 500],
    [null, 50],
    ["F", 375],
    [null, 50],
    ["C5", 125],
    [null, 50],
    ["A", 650],
    [null, 50],
    [null, 650]
  ],
  tempo: 100000
});
`
  },

  13: {
    instructions: "Now play another song.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode: `
piezo.play({
  song: [
    ["E5", 1],
    [null, 1 / 4],
    ["B4", 1],
    ["C5", 1],
    ["D5", 1],
    [null, 1 / 4],
    ["C5", 1],
    ["B4", 1],

    ["A4", 1],
    [null, 1 / 4],
    ["A4", 1],
    ["C5", 1],
    ["E5", 1],
    [null, 1 / 4],
    ["D5", 1],
    ["C5", 1],

    ["B4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    ["C5", 1],
    ["D5", 1],
    [null, 1 / 4],
    ["E5", 1],
    [null, 1 / 4],

    ["C5", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],

    ["D5", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    ["F5", 1],
    ["A5", 1],
    [null, 1 / 4],
    ["G5", 1],
    ["F5", 1],

    ["E5", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    ["C5", 1],
    ["E5", 1],
    [null, 1 / 4],
    ["D5", 1],
    ["C5", 1],

    ["B4", 1],
    [null, 1 / 4],
    ["B4", 1],
    ["C5", 1],
    ["D5", 1],
    [null, 1 / 4],
    ["E5", 1],
    [null, 1 / 4],

    ["C5", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],

    ["E5", 1],
    [null, 1 / 4],
    ["B4", 1],
    ["C5", 1],
    ["D5", 1],
    [null, 1 / 4],
    ["C5", 1],
    ["B4", 1],

    ["A4", 1],
    [null, 1 / 4],
    ["A4", 1],
    ["C5", 1],
    ["E5", 1],
    [null, 1 / 4],
    ["D5", 1],
    ["C5", 1],

    ["B4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    ["C5", 1],
    ["D5", 1],
    [null, 1 / 4],
    ["E5", 1],
    [null, 1 / 4],

    ["C5", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],

    ["E5", 1],
    [null, 1 / 4],
    ["B4", 1],
    ["C5", 1],
    ["D5", 1],
    [null, 1 / 4],
    ["C5", 1],
    ["B4", 1],

    ["A4", 1],
    [null, 1 / 4],
    ["A4", 1],
    ["C5", 1],
    ["E5", 1],
    [null, 1 / 4],
    ["D5", 1],
    ["C5", 1],

    ["B4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    ["C5", 1],
    ["D5", 1],
    [null, 1 / 4],
    ["E5", 1],
    [null, 1 / 4],

    ["C5", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],

    ["D5", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    ["F5", 1],
    ["A5", 1],
    [null, 1 / 4],
    ["G5", 1],
    ["F5", 1],

    ["E5", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    ["C5", 1],
    ["E5", 1],
    [null, 1 / 4],
    ["D5", 1],
    ["C5", 1],

    ["B4", 1],
    [null, 1 / 4],
    ["B4", 1],
    ["C5", 1],
    ["D5", 1],
    [null, 1 / 4],
    ["E5", 1],
    [null, 1 / 4],

    ["C5", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],

    ["E4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],
    ["C4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],

    ["D4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],
    ["B3", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],

    ["C4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],
    ["A3", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],

    ["G#3", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],
    ["B3", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],

    ["D4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],
    ["B3", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],

    ["C4", 1],
    [null, 1 / 4],
    ["E4", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],

    ["G#4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],

    ["E5", 1],
    [null, 1 / 4],
    ["B4", 1],
    ["C5", 1],
    ["D5", 1],
    [null, 1 / 4],
    ["C5", 1],
    ["B4", 1],

    ["A4", 1],
    [null, 1 / 4],
    ["A4", 1],
    ["C5", 1],
    ["E5", 1],
    [null, 1 / 4],
    ["D5", 1],
    ["C5", 1],

    ["B4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    ["C5", 1],
    ["D5", 1],
    [null, 1 / 4],
    ["E5", 1],
    [null, 1 / 4],

    ["C5", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],

    ["D5", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    ["F5", 1],
    ["A5", 1],
    [null, 1 / 4],
    ["G5", 1],
    ["F5", 1],

    ["E5", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    ["C5", 1],
    ["E5", 1],
    [null, 1 / 4],
    ["D5", 1],
    ["C5", 1],

    ["B4", 1],
    [null, 1 / 4],
    ["B4", 1],
    ["C5", 1],
    ["D5", 1],
    [null, 1 / 4],
    ["E5", 1],
    [null, 1 / 4],

    ["C5", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],

    ["E5", 1],
    [null, 1 / 4],
    ["B4", 1],
    ["C5", 1],
    ["D5", 1],
    [null, 1 / 4],
    ["C5", 1],
    ["B4", 1],

    ["A4", 1],
    [null, 1 / 4],
    ["A4", 1],
    ["C5", 1],
    ["E5", 1],
    [null, 1 / 4],
    ["D5", 1],
    ["C5", 1],

    ["B4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    ["C5", 1],
    ["D5", 1],
    [null, 1 / 4],
    ["E5", 1],
    [null, 1 / 4],

    ["C5", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    ["A4", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    [null, 1 / 4],

    ["D5", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    ["F5", 1],
    ["A5", 1],
    [null, 1 / 4],
    ["G5", 1],
    ["F5", 1],

    ["E5", 1],
    [null, 1 / 4],
    [null, 1 / 4],
    ["C5", 1],
    ["E5", 1],
    [null, 1 / 4],
    ["D5", 1],
    ["C5", 1],

    ["B4", 1],
    [null, 1 / 4],
    ["B4", 1],
    ["C5", 1],
    ["D5", 1],
    [null, 1 / 4],
    ["E5", 1],
    [null, 1 / 4],

    [null, 1]
  ],
  tempo: 250
});
`
  },

  14: {
    instructions: "Now read the temperature.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode: `
thermometer.on("data", function() {
  console.log("celsius: %d", this.C);
  console.log("fahrenheit: %d", this.F);
  console.log("kelvin: %d", this.K);
});
`
  },

  15: {
    instructions: "Now play the current light level as a sound.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode: `
light.on("data", function() {
  piezo.frequency(this.value);
});
`
  },

  16: {
    instructions: "Now play the current sound level as a sound.",

    verificationFunction: function (verificationAPI) {
      return true;
    },

    solutionCode: `

sound.scale([0, 100]).on("data", function() {
  console.log(this.value);
  pixels[0].intensity((this.value - 30) * 10);
});
`
  },
};


