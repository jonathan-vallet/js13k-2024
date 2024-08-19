const COLOR_SETS = {
  blueGreen: ['#024d53', '#599dbc', '#72d1c7', '#a9ffe6'],
  crate: ['#000', '#893a25', '#f89e61', '#863422'],
  green: ['#000', '#527f67', '#a2ce69', '#d6f8e1'],
  sand: ['#cab168', '#e5d09e'],
  bronze: ['#000', '#811c07', '#ca6137', '#ffb59c'],
};

const TILE_DATA = {
  arrow: {
    rle: '16LKZLA\\K^LZLBZLBZLLLLLLLLLLLLG',
    colors: COLOR_SETS.blueGreen,
  },
  block: {
    rle: '16AXNAMYezeYNZnZNedeNqeYlYeqNqeYgNgYeqNqeYfMeYMfYeqNqeYfMeYMfYeqNqeYeMfZMeYeqNqeYeMeNYMeYeqNqeYeNfNeYeqNqeYlYeqNedeNZnZNYezeYMAXNA',
    colors: COLOR_SETS.blueGreen,
  },
  characters: {
    rle: '144FPKQLPLLLLLLLLJNhNGNiNHNhNJPKQLPLPKQLPIMlMEMmMFMlMGNhNGNiNHNhNHNhNGNiNHNhNGMlMEMmMFMlMFMlMEMmMFMlMFMlMEMmMFMlMFMlMEMmMFMlMFMlMEMmMFMlMFMlMEMmMFMlMFMesereMEMeugMFMlMFMlMEMmMFMlMFMlMEMmMFMlMEMqeveqMEMufNEMqlqMEMereseMEMeugMFMlMFMereseMEMeugMFMlMFMrMrMrMFMqMseMqMFMlMEMqeveqMEMufNEMqlqMDMqeveqMEMufNEMqlqMFMqMrMqMGMqMuMHMjMGMrMrMrMFMqMseMqMFMlMFMrMrMrMFMqMseMqMFMlMFOtOGMtNHOtOFNqMrMqNFMqMuMHNhNGNqMrMqNFMqMuMHNhNFM[P[MGPYMGM[P[MDMZMtMZMFMtNHMZPZMEMZMtMZMFMtOGMZPZMDMZMZrZMZMFN[MFMZM^MZMCOYPYMYqMEQYNFMqM^OCMqYMYPYOFQ[MEO^MqMCMZM^MZMFMYMZMFMZM^MZMCMrM]NqMDMr\\MqMFN]MrMCMqN]MrMEMqNZMYqMEMrM]NEMqTqMGMYMqNGMqTqMEUANEO\\MHUDNAUGN\\MqMFUGN^NHOqMIN^NHMqNZMISHMZNqMIMZNqMJSIMqNZMHMrNrMIMrNJMrNrMJOrMHMrNrMHMrOJMrOJMrNrMJOrMJPKQLPLLLLLLLLJNhNGNiNHNhNJPKQLPLPKQLPIMlMEMmMFNjNGNhNGNiNHNhNHNhNGNiNHNhNGMlMEMmMFMlMFMlMEMmMFNjNFMlMEMmMFNjNFMgqhMEMmMFMlMFMlMEMmMFMlMFMlMEMmMFMlMFMeveMEMerjMFMlMFMgqhMEMmMFMlMFMgqhMEMmMFMlMEMqeveqMEMshMeMDMqlqMEMeveMEMerjMFMlMFMeveMEMerjMFMlMFMeqMrMqeMFMqMqgMqMeMDMgNgMEMqeveqMEMshMeMDMqlqMDMqeveqMEMshMeMDMqlqMFMqMrMqMGMqMqfrMfMEMeMfMeMGMeqMrMqeMFMqMqgMqMeMDMgNgMFMeqMrMqeMFMqMqgMqMeMDMgNgMGNtNHMtNfMFNhNHMqMrMqMGMqMqfrMfMEMeMfMeMHMqMrMqMGMqMqfrMfMEMeMfMeMGMZPZMHSeMEMYMhMYMFMYMtMYMGMtNfMEMYMhMYMFMYMtMYMGMtNfMEMYMhMYMFM[r[MGMYNYMANFMZMfMZMFMYQYNHSfMDMYMgPFNYQYMGTfMDMYNgOEMqN\\NqMFMZMqMHMqNYNYNqMEO\\MrMFMZqNqODMrNeQEMrM\\OGM[MrOEQeNrMCMrN\\NrMFMYMqMGMrN\\NrMCMrM\\PFMsPFPYNYMrMDP\\MrMEMqMZNqMFMrMYNYPDOrNrOGMrNHOrNrOEOqNrMIOYqMIMrNqOGMrNqOGMrNYNGOqNrMIMqNqMKMqMLMqNqMKOqMJMqNqMJMqOKMqOJMqOqMKOqME',
    colors: ['#000', '#e42c37', '#c07548', '#fdcbb0'],
  },
  crate: {
    rle: '16AXNANYnYOZVZNeNeqjNeNeMfqetfMeNeMfteqfMeNeNjqeNeNZVZOYnYOYXYO[MZM]OYNYMYNYPYNYMZMYNYMZMYNYPYNYMYNYO]MZM[NAXNA',
    colors: COLOR_SETS.crate,
  },
  flag: {
    rle: '48DYLCYLCYLBZLBZLBZLCMgLMlGMlGMkHMkHMkHMkHMkHMkHMkHMkHMkHMkHMlGMkHMFfGMLCMChHMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLCMLBZLBZLBZK',
    colors: COLOR_SETS.bronze,
  },
  'gong-trigger': {
    rle: '16XQsevesNqfTfqNfOhNgNfNeteNfNfMeqPqeMfMAMeMeqMrMqeMeMBMeMeqPqeMeMBMeNeteNeMBMeMAMhMAMeMBMeMBPBMeMBMeMHMeMBMeMHMeMBMeMAQBMeMBMeMBQAMeMBOHOA',
    colors: COLOR_SETS.bronze,
  },
  gong: {
    rle: '16F\\JZtZGYfvYEZe^rYC\\jYrYB[lYqYBZnZBYhthYBYgq\\qgYBYgqYrYqgYBYgq\\qgYBZgtgZBeZlZeCeZjZeEe`eGlD',
    colors: COLOR_SETS.bronze,
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
  },
  sand: {
    rle: '16ZMYV]MYV]MYW\\MYMYU^MYU^MZU^MZV]MYV]XM\\XM\\X[XN[XM\\X]XZ',
    colors: COLOR_SETS.sand,
  },
  'spawn-current': {
    rle: '16E\\LBYAYJZBYAYJZAYAYJYAYBYBYD[F[AYAYEZCYBZAZB\\AYB\\BYA\\BZAZBYCZEYAYA[F[DYBYBYAYJYAYAZJYAYBZJYAYLB\\E',
    colors: COLOR_SETS.blueGreen,
  },
  spawn: {
    rle: '32E\\L\\LBYAYLAYAYJZBYAYIZBYAYJZAYAYJZAYAYJYAYBYBYGYAYBYBYD[F[AYB[F[AYAYEfCYBYAYErCYBZAZBhAYB[AZBtAYB\\BYAhBZA[BYAtBZAZBYCfEYAYBYCrEYAYA[F[BYA[F[DYBYBYAYGYBYBYAYJYAYAZJYAYAZJYAYBZIYAYBZJYAYLAYAYLB\\L\\E',
    colors: COLOR_SETS.blueGreen,
  },
  trap: {
    rle: '16DNANANGVEQfQCNYM[N[NBMeMfYfMfMeMANZM\\e\\OeMfMYgMfMeO]N]OgNgMeYgN\\eYM]eYOeMeOgYfNAeZN[M[MeBNYeMgMfOCO[fZNFQfMJPF',
    colors: ['#306710', '#000', '#b1712e'],
  },
};

const STATIC_TILE_LIST = ['arrow', 'key-holder', 'rock', 'gong-trigger'];

// Game constants
const TILE_SIZE = 16; // Original tile size in pixels
const MAX_STEPS_ALLOWED = 13; // Triskaidekaphobia!!
const LEVEL_WIDTH = 20;
const LEVEL_HEIGHT = 10;

const DEFAULT_ANIMATION_INTERVAL = 200; // Default interval for animations before changing frames
const DEFAULT_REMOVAL_DURATION = 225; // Default duration for tile removal animations

// Orientation constants
const ORIENTATION_UP = 0;
const ORIENTATION_RIGHT = 1;
const ORIENTATION_DOWN = 2;
const ORIENTATION_LEFT = 3;

// Canvas variables
const uiCanvas = document.getElementById('uiCanvas');
const uiCtx = uiCanvas.getContext('2d');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const backgroundCanvas = document.getElementById('gameBackgroundCanvas');
const backgroundCtx = backgroundCanvas.getContext('2d');

// Global variables
let zoomFactor = 1; // Display size for each tile. Zoom whole game depending on screen size
let collectedKeysNumber = 0;
let movementHistory = [];

// Level data with specific tile color variations
let levelData = [
  { tile: 'arrow', x: 4, y: 7 },
  { tile: 'arrow', x: 4, y: 6, orientation: ORIENTATION_LEFT },
  { tile: 'arrow', x: 2, y: 4, orientation: ORIENTATION_LEFT },
  { tile: 'trap', x: 15, y: 6 },
  { tile: 'trap', x: 12, y: 6 },
  { tile: 'hole', x: 12, y: 5 },
  { tile: 'crate', x: 3, y: 6 },
  { tile: 'crate', x: 4, y: 6 },
  { tile: 'crate', x: 11, y: 6 },
  { tile: 'rock', x: 11, y: 2 },
  { tile: 'rock', x: 1, y: 3 },
  { tile: 'rock', x: 2, y: 3 },
  { tile: 'rock', x: 3, y: 3 },
  { tile: 'rock', x: 4, y: 3 },
  { tile: 'rock', x: 5, y: 3 },
  { tile: 'rock', x: 6, y: 3 },
  { tile: 'rock', x: 7, y: 3 },
  { tile: 'rock', x: 12, y: 3 },
  { tile: 'rock', x: 13, y: 3 },
  { tile: 'rock', x: 14, y: 3 },
  { tile: 'rock', x: 15, y: 3 },
  { tile: 'rock', x: 16, y: 3 },
  { tile: 'rock', x: 17, y: 3 },
  { tile: 'rock', x: 18, y: 3 },
  { tile: 'rock', x: 4, y: 4 },
  { tile: 'rock', x: 5, y: 4 },
  { tile: 'rock', x: 14, y: 4 },
  { tile: 'rock', x: 16, y: 4 },
  { tile: 'rock', x: 1, y: 5 },
  { tile: 'rock', x: 2, y: 5 },
  { tile: 'rock', x: 5, y: 5 },
  { tile: 'rock', x: 14, y: 5 },
  { tile: 'rock', x: 16, y: 5 },
  { tile: 'rock', x: 14, y: 6 },
  { tile: 'rock', x: 16, y: 6 },
  { tile: 'rock', x: 14, y: 7 },
  { tile: 'rock', x: 16, y: 7 },
  { tile: 'block', x: 8, y: 3, orientation: ORIENTATION_LEFT },
  { tile: 'block', x: 9, y: 3, orientation: ORIENTATION_LEFT },
  { tile: 'flag', x: 9, y: 2 },
  {
    tile: 'block',
    x: 10,
    y: 3,
    color: COLOR_SETS.green,
    orientation: ORIENTATION_LEFT,
    isPushable: true,
  },
  { tile: 'lock', x: 11, y: 3 },
  { tile: 'key-holder', x: 15, y: 4 },
  { tile: 'key', x: 15, y: 4 },
  { tile: 'gong-trigger', x: 1, y: 4 },
  { tile: 'gong', x: 15, y: 7 },
  { tile: 'spawn-current', x: 9, y: 7 },
];
