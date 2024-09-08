/**
 * @module sfx
 */
let hasPlayedWallSoundDuringKeyHold = false;

let sharedBlockSound = {
  songData: [
    {
      i: [0, 255, 116, 64, 0, 255, 120, 0, 64, 127, 4, 6, 35, 0, 0, 0, 0, 0, 0, 0, 2, 14, 0, 10, 32, 0, 0, 0, 0],
      p: [1],
      c: [{ n: [140, 142], f: [] }],
    },
  ],
  rowLen: 5513,
  patternLen: 32,
  endPattern: 0,
  numChannels: 1,
};

let soundList = {
  'gong-trigger': {
    songData: [
      {
        i: [0, 255, 152, 0, 0, 255, 152, 12, 0, 0, 2, 0, 60, 0, 0, 0, 0, 0, 0, 0, 2, 255, 0, 0, 32, 47, 3, 157, 2],
        p: [1],
        c: [{ n: [123], f: [] }],
      },
    ],
    rowLen: 5513,
    patternLen: 32,
    endPattern: 0,
    numChannels: 1,
  },
  fall: {
    songData: [
      {
        i: [0, 128, 106, 64, 0, 127, 106, 12, 64, 16, 0, 0, 134, 0, 0, 0, 0, 0, 0, 0, 2, 24, 169, 5, 71, 83, 5, 0, 0],
        p: [1],
        c: [{ n: [164], f: [] }],
      },
    ],
    rowLen: 7350,
    patternLen: 32,
    endPattern: 0,
    numChannels: 1,
  },
  crate: {
    songData: [
      {
        i: [0, 0, 140, 0, 0, 0, 140, 0, 0, 255, 11, 28, 59, 0, 0, 0, 0, 51, 2, 1, 2, 58, 31, 0, 32, 88, 1, 39, 2],
        p: [1],
        c: [{ n: [132], f: [] }],
      },
    ],
    rowLen: 5513,
    patternLen: 32,
    endPattern: 0,
    numChannels: 1,
  },
  key: {
    songData: [
      {
        i: [0, 255, 152, 0, 0, 255, 152, 12, 0, 0, 12, 17, 28, 0, 0, 0, 0, 0, 0, 0, 2, 255, 0, 0, 32, 47, 3, 0, 0],
        p: [1],
        c: [{ n: [135, 147], f: [] }],
      },
    ],
    rowLen: 7350,
    patternLen: 32,
    endPattern: 0,
    numChannels: 1,
  },
  spawn: {
    songData: [
      {
        i: [2, 64, 128, 0, 2, 64, 140, 14, 0, 0, 7, 20, 28, 0, 0, 0, 0, 97, 4, 1, 3, 49, 154, 0, 109, 107, 4, 93, 2],
        p: [1],
        c: [{ n: [135, 139, 142, 147], f: [] }],
      },
    ],
    rowLen: 6014,
    patternLen: 32,
    endPattern: 0,
    numChannels: 1,
  },
  lock: sharedBlockSound,
  'block-trigger': sharedBlockSound,
  block: sharedBlockSound,
  trap: {
    songData: [
      {
        i: [0, 0, 116, 0, 0, 0, 128, 0, 0, 255, 27, 39, 43, 0, 0, 0, 0, 51, 2, 1, 2, 33, 239, 3, 32, 113, 1, 39, 2],
        p: [1],
        c: [{ n: [123, 144], f: [] }],
      },
    ],
    rowLen: 5513,
    patternLen: 32,
    endPattern: 0,
    numChannels: 1,
  },
};

let audioElements = {};

function preloadSFX() {
  for (let key in soundList) {
    let audio = document.createElement('audio');
    let soundPlayer = new CPlayer();

    // Initialise et génère le son
    soundPlayer.init(soundList[key]);
    while (soundPlayer.generate() < 1) {}

    // Crée l'onde sonore et stocke l'audio
    var wave = soundPlayer.createWave();
    audio.src = URL.createObjectURL(new Blob([wave], { type: 'audio/wav' }));
    audioElements[key] = audio;
  }
}

function playActionSound(tile) {
  if (audioElements[tile]) {
    audioElements[tile].currentTime = 0; // Remet à zéro pour rejouer
    audioElements[tile].play();
  } else {
    // console.log(`Sound for ${tile} not found`);
  }
}
