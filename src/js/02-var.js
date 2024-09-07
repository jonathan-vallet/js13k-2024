// Canvas variables
const uiCanvas = $('#uiCanvas');
const uiCtx = uiCanvas.getContext('2d');
const canvas = $('#gameCanvas');
const ctx = canvas.getContext('2d');
const backgroundCanvas = $('#gameBackgroundCanvas');
const backgroundCtx = backgroundCanvas.getContext('2d');

let currentScreen = 'menu';

// Global variables
let zoomFactor = 1; // Display size for each tile. Zoom whole game depending on screen size
let collectedKeysNumber = 0;
let actionHistory;
let lastFrameTime = 0; // For animation loop
const keyStack = []; // Stack of keys pressed
let currentLevel = 1;

let $editorTileSelector = $('#editorTileSelect');
let $orientationSelect = $('#editorOrientationSelect');
let currentEditorTile = { x: -1, y: -1 };

let musicAudio = document.createElement('audio');
let musicplayer = new CPlayer();
