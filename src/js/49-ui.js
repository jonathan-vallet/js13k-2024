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
  adjustFontSize(`Steps: ${stepsPerformed}`);

  uiCtx.fillStyle = 'white';
  const y = uiCanvas.height / 2 + uiCtx.font.match(/\d+/)[0] / 2;
  uiCtx.fillText(`Steps: ${stepsPerformed}`, uiCanvas.width * 0.02, y);
  // Draw the key icon and count
  const keyTile = GAME_SPRITES['key'].tiles[0];
  const keyColors = DEFAULT_TILE_COLORS['key'] || [
    '#000',
    '#f00',
    '#0f0',
    '#00f',
  ];
  drawTile(keyTile, keyColors, 4.5, 0.75, { context: uiCtx });
  uiCtx.fillText(`x${collectedKeysNumber}`, uiCanvas.width * 0.28, y);

  uiCtx.fillText('R: Reset', uiCanvas.width * 0.8, y);
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
