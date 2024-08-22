function setZoomFactor() {
  zoomFactor = Math.min(
    Math.floor(window.innerWidth / (LEVEL_WIDTH * TILE_SIZE)),
    Math.floor((window.innerHeight * 0.89) / (LEVEL_HEIGHT * TILE_SIZE)),
  );
  canvas.width = LEVEL_WIDTH * TILE_SIZE * zoomFactor;
  canvas.height = LEVEL_HEIGHT * TILE_SIZE * zoomFactor;
  uiCanvas.width = canvas.width;
  uiCanvas.height = TILE_SIZE * 1.1 * zoomFactor; // 2 tiles high

  // background canvas has same ratio than canvas but cover window size
  if (window.innerWidth / window.innerHeight > LEVEL_WIDTH / LEVEL_HEIGHT) {
    backgroundCanvas.width = window.innerWidth;
    backgroundCanvas.height = window.innerWidth * (LEVEL_HEIGHT / LEVEL_WIDTH);
  } else {
    backgroundCanvas.height = window.innerHeight;
    backgroundCanvas.width = window.innerHeight * (LEVEL_WIDTH / LEVEL_HEIGHT);
  }
}

function initGame() {
  // Disable image smoothing for sharp pixelated look
  ctx.imageSmoothingEnabled = false;
  startLevel(currentLevel);
}

window.addEventListener('resize', () => {
  setZoomFactor();
  drawLevelBackground('sand', 'rock');
});
// Adjust the canvas size to fit the level size
setZoomFactor();

function switchMode(mode) {
  document.body.classList.remove(currentScreen);
  document.body.classList.add(mode);
  currentScreen = mode;

  if (currentScreen === 'game') {
    initGame();
  }
  if (currentScreen === 'editor') {
    initEditor();
  }
}

switchMode(currentScreen);
requestAnimationFrame(animate);
