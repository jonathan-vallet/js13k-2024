let $ = (selector) => document.querySelector(selector);
let setLocalStorage = (key, value) => localStorage.setItem(key, value);
let getLocalStorage = (key, defaultValue = null) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};

let min = Math.min;
let max = Math.max;

let characterData = getLocalStorage('characterData') || {
  gender: 0, // 0 = boy, 1 = girl
  skin: 0,
  hair: 0,
  outfit: 0,
};

const COLOR_SETS = {
  blueGreen: ['#024d53', '#599dbc', '#72d1c7', '#a9ffe6'],
  crate: ['#011721', '#893a25', '#f89e61', '#c16c43'],
  green: ['#011721', '#527f67', '#a2ce69', '#d6f8e1'],
  sand: ['#e5d09e', '#cab168'],
  bronze: ['#011721', '#811c07', '#ca6137', '#ffb59c'],
  silver: ['#011721', '#014a5d', '#7ddbff', '#d0ffea'],
  gold: ['#011721', '#5e3718', '#d8aa3b', '#fdffaa'],
  purple: ['#341b2e', '#6a5979', '#937cb2', '#afbeff'],
};
const COLOR_SELECTED = '#f5ff40';
const COLOR_TEXT = '#011721';

// Character customization options
const skinColors = ['#f9ece6', '#f0d3c5', '#e3b38d', '#bc8d57', '#a96c4f', '#704733'];
const hairColors = ['#dfa245', '#9e6631', '#ac422a', '#998880', '#e4e1ce', '#53381a', '#270e11'];
const outfitColors = ['#d14244', '#f1592a', '#fbd54e', '#017949', '#c9dfed', '#1b4872', '#724559'];
const genderOptions = [
  { text: 'BOY', action: 'selectGender', value: 'boy' },
  { text: 'GIRL', action: 'selectGender', value: 'girl' },
];

// CAUTION! If new assets are added, push them at the end of the object, or it will break RLE of every levels
const TILE_DATA = {
  arrow: {
    rle: '16LKZLA\\K^LZLBZLBZLLLLLLLLLLLLG',
    colors: COLOR_SETS.blueGreen,
    limit: 0,
    isStatic: true,
  },
  block: {
    rle: '16AXNAMYezeYNZnZNedeNqeYlYeqNqeYgNgYeqNqeYfMeYMfYeqNqeYfMeYMfYeqNqeYeMfZMeYeqNqeYeMeNYMeYeqNqeYeNfNeYeqNqeYlYeqNedeNZnZNYezeYMAXNA',
    colors: COLOR_SETS.blueGreen,
    canChangeOrientation: true,
  },
  'block-trigger': {
    rle: '16AXNAMYezeYNZnZNedeNqeYlYeqNqeYgNgYeqNqeYfMeYMfYeqNqeYfMeYMfYeqNqeYeMfZMeYeqNqeYeMeNYMeYeqNqeYeNfNeYeqNqeYlYeqNedeNZnZNYezeYMAXNA',
    colors: COLOR_SETS.green,
    canChangeOrientation: true,
  },
  boulder: {
    rle: '16LIRHNgqYqNEMgsZrMCMfrYrZsMBMesYqZtMAMfYrYq^qNfZqZuZNerYrYvYN]q[tYNtYs^MAMs[uYMBM\\q[q[MCMtYq\\MENs[NHRE',
    colors: COLOR_SETS.crate,
  },
  crate: {
    rle: '16AXNANYnYOZVZNeNeqjNeNeMfqetfMeNeMfteqfMeNeNjqeNeNZVZOYnYOYXYO[MZM]OYNYMYNYPYNYMZMYNYMZMYNYPYNYMYNYO]MZM[NAXNA',
    colors: COLOR_SETS.crate,
  },
  flag: {
    rle: '48DYLCYLCYLBZLBZLBZLCMgLMlGMlGMkHMkHMkHMkHMkHMkHMkHMkHMkHMkHMlGMkHMFfGMLCMChHMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLBZLBZLBZK',
    colors: COLOR_SETS.bronze,
    limit: 1,
  },
  'gong-trigger': {
    rle: '16XQsevesNqfTfqNfOhNgNfNeteNfNfMeqPqeMfMAMeMeqMrMqeMeMBMeMeqPqeMeMBMeNeteNeMBMeMAMhMAMeMBMeMBPBMeMBMeMHMeMBMeMHMeMBMeMAQBMeMBMeMBQAMeMBOHOA',
    colors: [COLOR_SETS.bronze, COLOR_SETS.silver, COLOR_SETS.gold, COLOR_SETS.purple],
    useOrientationForColor: true,
    isStatic: true,
  },
  gong: {
    rle: '16F\\JZtZGYfvYEZe^rYC\\jYrYB[lYqYBZnZBYhthYBYgq\\qgYBYgqYrYqgYBYgq\\qgYBZgtgZBeZlZeCeZjZeEe`eGlD',
    colors: [COLOR_SETS.bronze, COLOR_SETS.silver, COLOR_SETS.gold, COLOR_SETS.purple],
    useOrientationForColor: true,
  },
  'hole-filled': {
    rle: '16LLLAMANAMFXNANYnYOZVZNeNeqjNeNeMfqetfMeNeMfteqfMeNeNjqeNeNZVZOYnYOYXYMAM[MZM]MCMAYMYNYNAMLF',
    colors: COLOR_SETS.crate,
  },
  hole: {
    rle: '16LLLYA\\AYGbEYA`AYDdCYAbAYB\\MYNYM\\A\\MYMZMYM\\AZMYMYNYMYMZCZTZCZMYRYMZCZTZEYTYHRLI',
    colors: ['#000', '#00506e'],
  },
  'key-holder': {
    rle: '16LFdCYpYAZ{e\\qbe\\qYeYhYeYe\\qZfZfZe\\qYgZgYe\\qYgYhYe\\qZfZfZe\\qYeYhYeYe\\qbe\\oq[edqZpfYAdZA',
    colors: COLOR_SETS.blueGreen,
    limit: 0,
    isStatic: true,
  },
  key: {
    rle: '16FtKqPqIqMhMqHqMYNeMqHqMYNeMqHqM\\MqIqNYMqJqMeYMqJqNYMqJqMZMqKqNqLArLLLLLK',
    colors: COLOR_SETS.green,
  },
  lock: {
    rle: '16FPKMtMIMq\\qMGMZhYqMEMZeqNYeYqMCNYeqPYeYqMAOYeqPYeYrPYfqNYfYrO[eqNYeYfqMYM\\ereYgMYAYM\\fYgMYCYM[MYgMYEYMYMfYeMYGYMhMYIYPYK\\F',
    colors: COLOR_SETS.green,
  },
  rock: {
    rle: '16FPIOhNFMeresfMDMerYeueMCMfqZesfqMBMgqZgYfMBMiYgZNBNYkZqNBNYiZsMBMqgriqMAMqeqYgqMYgMAMYfqMYeqMYgMAMZeqMYfNYfMAOZNYPYMqBPEOLF',
    colors: COLOR_SETS.blueGreen,
    isStatic: true,
  },
  'spawn-current': {
    rle: '16E\\LBYAYJZBYAYJZAYAYJYAYBYBYD[F[AYAYEZCYBZAZB\\AYB\\BYA\\BZAZBYCZEYAYA[F[DYBYBYAYJYAYAZJYAYBZJYAYLB\\E',
    colors: COLOR_SETS.blueGreen,
    limit: 1,
  },
  spawn: {
    rle: '32E\\L\\LBYAYLAYAYJZBYAYIZBYAYJZAYAYJZAYAYJYAYBYBYGYAYBYBYD[F[AYB[F[AYAYEfCYBYAYErCYBZAZBhAYB[AZBtAYB\\BYAhBZA[BYAtBZAZBYCfEYAYBYCrEYAYA[F[BYA[F[DYBYBYAYGYBYBYAYJYAYAZJYAYAZJYAYBZIYAYBZJYAYLAYAYLB\\L\\E',
    colors: COLOR_SETS.blueGreen,
  },
  trap: {
    rle: '16DNANANGVEQfQCNYM[N[NBMeMfYfMfMeMANZM\\e\\OeMfMYgMfMeO]N]OgNgMeYgN\\eYM]eYOeMeOgYfNAeZN[M[MeBNYeMgMfOCO[fZNFQfMJPF',
    colors: ['#306710', '#000', '#b1712e'],
  },
  sand: {
    rle: '16ZMYV]MYV]MYW\\MYMYU^MYU^MZU^MZV]MYV]XM\\XM\\X[XN[XM\\X]XZ',
    colors: COLOR_SETS.sand,
    limit: 0,
  },
  characters: {
    rle: '144FPKQLPLLLLLLLLJNhNGNiNHNhNJPKQLPLPKQLPIMlMEMmMFMlMGNhNGNiNHNhNHNhNGNiNHNhNGMlMEMmMFMlMFMlMEMmMFMlMFMlMEMmMFMlMFMlMEMmMFMlMFMlMEMmMFMlMFMlMEMmMFMlMFMe[eZeMEMe]gMFMlMFMlMEMmMFMlMFMlMEMmMFMlMEMYe^eYMEM]fNEMYlYMEMeZe[eMEMe]gMFMlMFMeZe[eMEMe]gMFMlMFMZMZMZMFMYM[eMYMFMlMEMYe^eYMEM]fNEMYlYMDMYe^eYMEM]fNEMYlYMFMYMZMYMGMYM]MHMjMGMZMZMZMFMYM[eMYMFMlMFMZMZMZMFMYM[eMYMFMlMFO\\OGM\\NHO\\OFNYMZMYNFMYM]MHNhNGNYMZMYNFMYM]MHNhNFMsPsMGPqMGMsPsMDMrM\\MrMFM\\NHMrPrMEMrM\\MrMFM\\OGMrPrMDMrMrZrMrMFNsMFMrMvMrMCOqPqMqYMEQqNFMYMvOCMYqMqPqOFQsMEOvMYMCMrMvMrMFMqMrMFMrMvMrMCMZMuNYMDMZtMYMFNuMZMCMYNuMZMEMYNrMqYMEMZMuNEMYTYMGMqMYNGMYTYMEUANEOtMHUDNAUGNtMYMFUGNvNHOYMINvNHMYNrMISHMrNYMIMrNYMJSIMYNrMHMZNZMIMZNJMZNZMJOZMHMZNZMHMZOJMZOJMZNZMJOZMJPKQLPLLLLLLLLJNhNGNiNHNhNJPKQLPLPKQLPIMlMEMmMFNjNGNhNGNiNHNhNHNhNGNiNHNhNGMlMEMmMFMlMFMlMEMmMFNjNFMlMEMmMFNjNFMgYhMEMmMFMlMFMlMEMmMFMlMFMlMEMmMFMlMFMe^eMEMeZjMFMlMFMgYhMEMmMFMlMFMgYhMEMmMFMlMEMYe^eYMEM[hMeMDMYlYMEMe^eMEMeZjMFMlMFMe^eMEMeZjMFMlMFMeYMZMYeMFMYMYgMYMeMDMgNgMEMYe^eYMEM[hMeMDMYlYMDMYe^eYMEM[hMeMDMYlYMFMYMZMYMGMYMYfZMfMEMeMfMeMGMeYMZMYeMFMYMYgMYMeMDMgNgMFMeYMZMYeMFMYMYgMYMeMDMgNgMGN\\NHM\\NfMFNhNHMYMZMYMGMYMYfZMfMEMeMfMeMHMYMZMYMGMYMYfZMfMEMeMfMeMGMrPrMHSeMEMqMhMqMFMqM\\MqMGM\\NfMEMqMhMqMFMqM\\MqMGM\\NfMEMqMhMqMFMsZsMGMqNqMANFMrMfMrMFMqQqNHSfMDMqMgPFNqQqMGTfMDMqNgOEMYNtNYMFMrMYMHMYNqNqNYMEOtMZMFMrYNYODMZNeQEMZMtOGMsMZOEQeNZMCMZNtNZMFMqMYMGMZNtNZMCMZMtPFM[PFPqNqMZMDPtMZMEMYMrNYMFMZMqNqPDOZNZOGMZNHOZNZOEOYNZMIOqYMIMZNYOGMZNYOGMZNqNGOYNZMIMYNYMKMYMLMYNYMKOYMJMYNYMJMYOKMYOJMYOYMKOYME',
    colors: [
      '#000',
      skinColors[characterData.skin],
      hairColors[characterData.hair],
      outfitColors[characterData.outfit],
    ],
    limit: 0,
  },
  spikes: {
    rle: '16CMGMEeOiOeBeYMqM]MqMYeAYNeN[NeNYAYMgM[MgMYAYMgM[MgMYAYQ[QYAd[A[M_M[AZO]OZAZMqM]MqMZAYNeN[NeNYAYMgM[MgMYAYMgM[MgMYAYQ[QYBdYB',
    colors: COLOR_SETS.blueGreen,
  },
  'switch-off': {
    rle: '16LLIpfBedeBeZxZeBeYzYeBeYs\\sYeBeYs\\sYeBeYs\\sYeBeYzYeBeYzYeBeZxZeBedeBpfLLI',
    colors: [COLOR_SETS.purple, COLOR_SETS.bronze, COLOR_SETS.silver, COLOR_SETS.gold],
    useOrientationForColor: true,
  },
  'switch-on': {
    rle: '16CVEMexeMDMqftfqMCeMqeqPqeqMeBeMqeqPqeqMeBeMqeqPqeqMeBeMqftfqMeBeMexeMeBeNlNeBeMqZereZqMeBeMeqZfZqeMeBeMYerfreYMeBeNYe\\eYNeBeXeBiDiLE',
    colors: COLOR_SETS.purple,
    colors: [COLOR_SETS.purple, COLOR_SETS.bronze, COLOR_SETS.silver, COLOR_SETS.gold],
    useOrientationForColor: true,
  },
  'switch-trigger': {
    rle: '16Zp[pfYplTkMxMjMxMjMrPrMjMrPrMjMrPrMjMxMjMxMjM`MjYTYk`hYpf[pZ',
    colors: COLOR_SETS.purple,
    colors: [COLOR_SETS.purple, COLOR_SETS.bronze, COLOR_SETS.silver, COLOR_SETS.gold],
    useOrientationForColor: true,
  },
  'sound-off': {
    rle: '16LIOLMfMBMCMDMgMAMYMAMYMANhMAMYMAMYNjMBMYMYMAMjMBM[MAMeYeYeYMCMYMBMYeYeYeMCMYMBM^MBM[MAM^MBMYMYMBN\\MAMYMAMYMCM[MAMYMAMYMDMZMBMCMFOLL',
    colors: COLOR_SETS.purple,
    limit: 0,
  },
  'sound-on': {
    rle: '16LIOLMfMBNGMgMAMfMDNhMBMfMBMjMCMfMAMjMDMeMAMeYeYeYMDMfNYeYeYeMDMfN^MDMeMAM^MCMfMBN\\MBMfMEM[MAMfMGMZMBNIOLL',
    colors: COLOR_SETS.green,
    limit: 0,
  },
  star: {
    rle: '16GNLAMZMLMZMKMeZeMJMereMEQeteRZfqMrMqfZMAMeYrMrMrYeMCMfvfMEMeqPqeMEMesNseMDMfvfMDMfZrZfMCMeZfNfZeMBMeYeNBNeYeMBPFPA',
    colors: COLOR_SETS.gold,
    limit: 0,
  },
};

// Game constants
const TILE_SIZE = 16; // Original tile size in pixels
const MAX_STEPS_ALLOWED = 13; // Triskaidekaphobia!!
const LEVEL_WIDTH = 20;
const LEVEL_HEIGHT = 10;

const ANIMATION_INTERVAL = {
  flag: 200,
  spawn: 600,
};
const DEFAULT_REMOVAL_DURATION = 225; // Default duration for tile removal animations in ms
const TILE_CELL_MOVE_DURATION = 125; // Duration for tile movement animations in ms
const CHARACTER_MOVE_DURATION = 300; // Duration of the character movement animation in ms
const CHARACTER_RESPAWN_DURATION = 400; // Duration of the character return animation in ms

// Orientation constants
const ORIENTATION_UP = 0;
const ORIENTATION_RIGHT = 1;
const ORIENTATION_DOWN = 2;
const ORIENTATION_LEFT = 3;
