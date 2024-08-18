function refreshUI() {
  drawUI();
}

/**
 * Draw the UI (steps, keys, controls) on the UI canvas
 */
function drawUI() {
  uiCtx.fillStyle = '#333';
  uiCtx.fillRect(0, 0, uiCanvas.width, uiCanvas.height);

  // Draw steps remaining
  adjustFontSize(`Steps: ${stepsRemaining}`);

  uiCtx.fillStyle = 'white';
  const y = uiCanvas.height / 2 + uiCtx.font.match(/\d+/)[0] / 2;
  uiCtx.fillText(`Steps: ${stepsRemaining}`, uiCanvas.width * 0.02, y);
  // Draw the key icon and count
  const keyTile = GAME_SPRITES['key'].tiles[0];
  const keyColors = DEFAULT_TILE_COLORS['key'];
  drawTile(keyTile, keyColors, 4.5, 0.75, ORIENTATION_UP, 1, uiCtx);
  uiCtx.fillText(`x${collectedKeysNumber}`, uiCanvas.width * 0.28, y);

  // Draw controls (Reset, Undo)
  uiCtx.fillText('R: Reset', uiCanvas.width * 0.8, y * 0.7);
  uiCtx.fillText('Undo', uiCanvas.width * 0.8, y * 1.3);
}

/**
 * Adjust the font size to fit the text in the canvas depending on the text length and canvas width
 * @param {string} text - The text to display
 */
function adjustFontSize(text) {
  let textLength = text.length;
  uiCtx.font = '40px Arial';
  while (uiCtx.measureText(text).width > uiCanvas.width * textLength * 0.02) {
    uiCtx.font = `${parseInt(uiCtx.font) - 1}px Arial`;
  }
}
