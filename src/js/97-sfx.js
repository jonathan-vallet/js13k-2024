/**
 * @module sfx
 */
let hasPlayedWallSoundDuringKeyHold = false;

let soundList = {
  'gong-trigger': {
    songData: [
      {
        // Instrument 0
        i: [
          0, // OSC1_WAVEFORM
          255, // OSC1_VOL
          152, // OSC1_SEMI
          0, // OSC1_XENV
          0, // OSC2_WAVEFORM
          255, // OSC2_VOL
          152, // OSC2_SEMI
          12, // OSC2_DETUNE
          0, // OSC2_XENV
          0, // NOISE_VOL
          2, // ENV_ATTACK
          0, // ENV_SUSTAIN
          60, // ENV_RELEASE
          0, // ENV_EXP_DECAY
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          0, // LFO_AMT
          0, // LFO_FREQ
          0, // LFO_FX_FREQ
          2, // FX_FILTER
          255, // FX_FREQ
          0, // FX_RESONANCE
          0, // FX_DIST
          32, // FX_DRIVE
          47, // FX_PAN_AMT
          3, // FX_PAN_FREQ
          157, // FX_DELAY_AMT
          2, // FX_DELAY_TIME
        ],
        // Patterns
        p: [1],
        // Columns
        c: [{ n: [123], f: [] }],
      },
    ],
    rowLen: 5513, // In sample lengths
    patternLen: 32, // Rows per pattern
    endPattern: 0, // End pattern
    numChannels: 1, // Number of channels
  },
  fall: {
    songData: [
      {
        // Instrument 0
        i: [
          0, // OSC1_WAVEFORM
          128, // OSC1_VOL
          106, // OSC1_SEMI
          64, // OSC1_XENV
          0, // OSC2_WAVEFORM
          127, // OSC2_VOL
          106, // OSC2_SEMI
          12, // OSC2_DETUNE
          64, // OSC2_XENV
          16, // NOISE_VOL
          0, // ENV_ATTACK
          0, // ENV_SUSTAIN
          134, // ENV_RELEASE
          0, // ENV_EXP_DECAY
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          0, // LFO_AMT
          0, // LFO_FREQ
          0, // LFO_FX_FREQ
          2, // FX_FILTER
          24, // FX_FREQ
          169, // FX_RESONANCE
          5, // FX_DIST
          71, // FX_DRIVE
          83, // FX_PAN_AMT
          5, // FX_PAN_FREQ
          0, // FX_DELAY_AMT
          0, // FX_DELAY_TIME
        ],
        // Patterns
        p: [1],
        // Columns
        c: [{ n: [164], f: [] }],
      },
    ],
    rowLen: 7350, // In sample lengths
    patternLen: 32, // Rows per pattern
    endPattern: 0, // End pattern
    numChannels: 1, // Number of channels
  },
  crate: {
    songData: [
      {
        // Instrument 0
        i: [
          0, // OSC1_WAVEFORM
          0, // OSC1_VOL
          140, // OSC1_SEMI
          0, // OSC1_XENV
          0, // OSC2_WAVEFORM
          0, // OSC2_VOL
          140, // OSC2_SEMI
          0, // OSC2_DETUNE
          0, // OSC2_XENV
          255, // NOISE_VOL
          11, // ENV_ATTACK
          28, // ENV_SUSTAIN
          59, // ENV_RELEASE
          0, // ENV_EXP_DECAY
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          51, // LFO_AMT
          2, // LFO_FREQ
          1, // LFO_FX_FREQ
          2, // FX_FILTER
          58, // FX_FREQ
          31, // FX_RESONANCE
          0, // FX_DIST
          32, // FX_DRIVE
          88, // FX_PAN_AMT
          1, // FX_PAN_FREQ
          39, // FX_DELAY_AMT
          2, // FX_DELAY_TIME
        ],
        // Patterns
        p: [1],
        // Columns
        c: [{ n: [132], f: [] }],
      },
    ],
    rowLen: 5513, // In sample lengths
    patternLen: 32, // Rows per pattern
    endPattern: 0, // End pattern
    numChannels: 1, // Number of channels
  },
  key: {
    songData: [
      {
        // Instrument 0
        i: [
          0, // OSC1_WAVEFORM
          255, // OSC1_VOL
          152, // OSC1_SEMI
          0, // OSC1_XENV
          0, // OSC2_WAVEFORM
          255, // OSC2_VOL
          152, // OSC2_SEMI
          12, // OSC2_DETUNE
          0, // OSC2_XENV
          0, // NOISE_VOL
          12, // ENV_ATTACK
          17, // ENV_SUSTAIN
          28, // ENV_RELEASE
          0, // ENV_EXP_DECAY
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          0, // LFO_AMT
          0, // LFO_FREQ
          0, // LFO_FX_FREQ
          2, // FX_FILTER
          255, // FX_FREQ
          0, // FX_RESONANCE
          0, // FX_DIST
          32, // FX_DRIVE
          47, // FX_PAN_AMT
          3, // FX_PAN_FREQ
          0, // FX_DELAY_AMT
          0, // FX_DELAY_TIME
        ],
        // Patterns
        p: [1],
        // Columns
        c: [{ n: [135, 147], f: [] }],
      },
    ],
    rowLen: 7350, // In sample lengths
    patternLen: 32, // Rows per pattern
    endPattern: 0, // End pattern
    numChannels: 1, // Number of channels
  },
  spawn: {
    songData: [
      {
        // Instrument 0
        i: [
          2, // OSC1_WAVEFORM
          64, // OSC1_VOL
          128, // OSC1_SEMI
          0, // OSC1_XENV
          2, // OSC2_WAVEFORM
          64, // OSC2_VOL
          140, // OSC2_SEMI
          14, // OSC2_DETUNE
          0, // OSC2_XENV
          0, // NOISE_VOL
          7, // ENV_ATTACK
          20, // ENV_SUSTAIN
          28, // ENV_RELEASE
          0, // ENV_EXP_DECAY
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          97, // LFO_AMT
          4, // LFO_FREQ
          1, // LFO_FX_FREQ
          3, // FX_FILTER
          49, // FX_FREQ
          154, // FX_RESONANCE
          0, // FX_DIST
          109, // FX_DRIVE
          107, // FX_PAN_AMT
          4, // FX_PAN_FREQ
          93, // FX_DELAY_AMT
          2, // FX_DELAY_TIME
        ],
        // Patterns
        p: [1],
        // Columns
        c: [{ n: [135, 139, 142, 147], f: [] }],
      },
    ],
    rowLen: 6014, // In sample lengths
    patternLen: 32, // Rows per pattern
    endPattern: 0, // End pattern
    numChannels: 1, // Number of channels
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
