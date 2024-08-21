// Canvas variables
const uiCanvas = $('#uiCanvas');
const uiCtx = uiCanvas.getContext('2d');
const canvas = $('#gameCanvas');
const ctx = canvas.getContext('2d');
const backgroundCanvas = $('#gameBackgroundCanvas');
const backgroundCtx = backgroundCanvas.getContext('2d');
const editorCanvas = $('#editorCanvas');
const editorCtx = editorCanvas.getContext('2d');

let currentCanvas = canvas; // Current canvas context
let currentCtx = ctx; // Current canvas context
let currentMode = 'game'; // Current mode: game or editor
// currentMode = 'editor'; // Current mode: game or editor

// Global variables
let zoomFactor = 1; // Display size for each tile. Zoom whole game depending on screen size
let collectedKeysNumber = 0;
let movementHistory = [];
let lastFrameTime = 0; // For animation loop
const keyStack = []; // Stack of keys pressed
let currentLevel = 0;

let $editorTileSelector = $('#editorTileSelect');
let $orientationSelect = $('#editorOrientationSelect');
let currentEditorTile = { x: -1, y: -1 };
