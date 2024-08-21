let $ = (selector) => document.querySelector(selector);

const COLOR_SETS = {
  blueGreen: ['#024d53', '#599dbc', '#72d1c7', '#a9ffe6'],
  crate: ['#000', '#893a25', '#f89e61', '#c16c43'],
  green: ['#000', '#527f67', '#a2ce69', '#d6f8e1'],
  sand: ['#e5d09e', '#cab168'],
  bronze: ['#000', '#811c07', '#ca6137', '#ffb59c'],
};

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
    colors: COLOR_SETS.bronze,
    isStatic: true,
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
    rle: '144FPKQLPLLLLLLLLJNhNGNiNHNhNJPKQLPLPKQLPIMlMEMmMFMlMGNhNGNiNHNhNHNhNGNiNHNhNGMlMEMmMFMlMFMlMEMmMFMlMFMlMEMmMFMlMFMlMEMmMFMlMFMlMEMmMFMlMFMlMEMmMFMlMFMesereMEMeugMFMlMFMlMEMmMFMlMFMlMEMmMFMlMEMqeveqMEMufNEMqlqMEMereseMEMeugMFMlMFMereseMEMeugMFMlMFMrMrMrMFMqMseMqMFMlMEMqeveqMEMufNEMqlqMDMqeveqMEMufNEMqlqMFMqMrMqMGMqMuMHMjMGMrMrMrMFMqMseMqMFMlMFMrMrMrMFMqMseMqMFMlMFOtOGMtNHOtOFNqMrMqNFMqMuMHNhNGNqMrMqNFMqMuMHNhNFM[P[MGPYMGM[P[MDMZMtMZMFMtNHMZPZMEMZMtMZMFMtOGMZPZMDMZMZrZMZMFN[MFMZM^MZMCOYPYMYqMEQYNFMqM^OCMqYMYPYOFQ[MEO^MqMCMZM^MZMFMYMZMFMZM^MZMCMrM]NqMDMr\\MqMFN]MrMCMqN]MrMEMqNZMYqMEMrM]NEMqTqMGMYMqNGMqTqMEUANEO\\MHUDNAUGN\\MqMFUGN^NHOqMIN^NHMqNZMISHMZNqMIMZNqMJSIMqNZMHMrNrMIMrNJMrNrMJOrMHMrNrMHMrOJMrOJMrNrMJOrMJPKQLPLLLLLLLLJNhNGNiNHNhNJPKQLPLPKQLPIMlMEMmMFNjNGNhNGNiNHNhNHNhNGNiNHNhNGMlMEMmMFMlMFMlMEMmMFNjNFMlMEMmMFNjNFMgqhMEMmMFMlMFMlMEMmMFMlMFMlMEMmMFMlMFMeveMEMerjMFMlMFMgqhMEMmMFMlMFMgqhMEMmMFMlMEMqeveqMEMshMeMDMqlqMEMeveMEMerjMFMlMFMeveMEMerjMFMlMFMeqMrMqeMFMqMqgMqMeMDMgNgMEMqeveqMEMshMeMDMqlqMDMqeveqMEMshMeMDMqlqMFMqMrMqMGMqMqfrMfMEMeMfMeMGMeqMrMqeMFMqMqgMqMeMDMgNgMFMeqMrMqeMFMqMqgMqMeMDMgNgMGNtNHMtNfMFNhNHMqMrMqMGMqMqfrMfMEMeMfMeMHMqMrMqMGMqMqfrMfMEMeMfMeMGMZPZMHSeMEMYMhMYMFMYMtMYMGMtNfMEMYMhMYMFMYMtMYMGMtNfMEMYMhMYMFM[r[MGMYNYMANFMZMfMZMFMYQYNHSfMDMYMgPFNYQYMGTfMDMYNgOEMqN\\NqMFMZMqMHMqNYNYNqMEO\\MrMFMZqNqODMrNeQEMrM\\OGM[MrOEQeNrMCMrN\\NrMFMYMqMGMrN\\NrMCMrM\\PFMsPFPYNYMrMDP\\MrMEMqMZNqMFMrMYNYPDOrNrOGMrNHOrNrOEOqNrMIOYqMIMrNqOGMrNqOGMrNYNGOqNrMIMqNqMKMqMLMqNqMKOqMJMqNqMJMqOKMqOJMqOqMKOqME',
    colors: ['#000', '#e42c37', '#c07548', '#fdcbb0'],
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
