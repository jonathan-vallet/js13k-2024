/**
 * Canvas rendering functions
 * @module 50-canvas
 */

/**
 * Refresh the canvas by redrawing the level and the character
 */
function refreshCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  if (currentScreen === 'menu') {
    drawStartScreen();
  }
  if (currentScreen === 'characterSelection') {
    drawCharacterSelectionScreen();
  }
  if (currentScreen === 'editor') {
    drawLevel(currentLevel);
    drawEditorSelectedTile();
  }
  if (currentScreen === 'game') {
    drawLevel(currentLevel);
    drawCharacter();
  }
  refreshUI();
}

/**
 * Draw the level background and elements
 */
function drawLevel(levelIndex) {
  // draw background image
  ctx.drawImage(backgroundCanvas, 0, 0, canvas.width, canvas.height);
  drawLevelElements(levels[levelIndex].levelData);
}

/**
 * Draw the background of the level with a border
 * @param {string} backgroundTileName - The name of the background tile
 * @param {string} borderTileName - The name of the border tile
 */
function drawLevelBackground(backgroundTileName, borderTileName) {
  const backgroundTile = TILE_DATA[backgroundTileName].tiles[0];
  const backgroundColors = TILE_DATA[backgroundTileName].colors;
  const borderTile = TILE_DATA[borderTileName].tiles[0];
  const borderColors = TILE_DATA[borderTileName].colors;

  for (let y = 0; y < LEVEL_HEIGHT; y++) {
    for (let x = 0; x < LEVEL_WIDTH; x++) {
      // Draw the background tile at every position
      drawTile(backgroundTile, backgroundColors, x, y);

      // Draw the border tile at the edges
      if (x === 0 || x === LEVEL_WIDTH - 1 || y === 0 || y === LEVEL_HEIGHT - 1) {
        drawTile(borderTile, borderColors, x, y);
      }
    }
  }

  // Draw all static elements
  if (currentScreen === 'game') {
    drawLevelElements(levels[currentLevel].levelData, true);
  }
  backgroundCtx.drawImage(canvas, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
}

/**
 * Draw the level background elements
 * @param {Array} levelData - The level data array with tile information
 */
function drawLevelElements(levelData, isDrawingStatic = false) {
  levelData.forEach((element) => {
    const tile = TILE_DATA[element.tile];

    // If drawing static elements, draw a key-holder under each key
    if (isDrawingStatic && element.tile === 'key') {
      const keyHolderTile = TILE_DATA['key-holder'];
      const keyHolderFrame = keyHolderTile.tiles[0]; // Assume the key-holder has only one frame
      const keyHolderColors = keyHolderTile.colors;
      drawTile(keyHolderFrame, keyHolderColors, element.x, element.y);
    }

    if (currentScreen === 'game' && ((isDrawingStatic && !tile.isStatic) || (!isDrawingStatic && tile.isStatic))) {
      return;
    }
    const frame = tile.tiles[element.animationFrame || 0]; // Get the current frame
    const colors = element.color || TILE_DATA[element.tile].colors;
    const x = element.x;
    const y = element.y;
    const orientation = element.orientation || ORIENTATION_UP;
    const scale = element.scale || 1;
    const useOrientationForColor = TILE_DATA[element.tile].useOrientationForColor;
    drawTile(frame, colors, x, y, { orientation, scale, useOrientationForColor });
  });
}

/**
 * Draw a tile on the canvas at the specified position, color, and optional transformations
 * @param {number[][]} tile - The tile to draw (required)
 * @param {string[]} colors - The colors for the tile (required)
 * @param {number} x - The x-coordinate of the tile (required)
 * @param {number} y - The y-coordinate of the tile (required)
 * @param {Object} [options={}] - Optional parameters: orientation, scale, context, flipHorizontally
 * @param {number} [options.orientation=ORIENTATION_UP] - The orientation of the tile
 * @param {number} [options.scale=1] - The scale to apply to the tile
 * @param {CanvasRenderingContext2D} [options.context=ctx] - The canvas context to draw on
 * @param {boolean} [options.flipHorizontally=false] - Whether to flip the tile horizontally
 */
function drawTile(tile, colors, x, y, options = {}) {
  const {
    orientation = ORIENTATION_UP,
    scale = tile.scale || 1,
    context = ctx,
    flipHorizontally = false,
    alpha = 1,
    useOrientationForColor = false,
  } = options;

  context.save();

  const halfTileSize = (TILE_SIZE * zoomFactor) / 2;
  context.translate(Math.floor((x + 0.5) * TILE_SIZE * zoomFactor), Math.floor((y + 0.5) * TILE_SIZE * zoomFactor));

  // Apply horizontal flip if necessary
  let scaleDirection = 1;
  if (flipHorizontally) {
    scaleDirection = -1;
  }

  context.scale(scale * scaleDirection, scale); // Apply scaling
  if (useOrientationForColor) {
    colors = colors[orientation];
  } else {
    context.rotate((orientation * Math.PI) / 2); // Apply rotation
  }
  context.translate(-halfTileSize, -halfTileSize); // Move to the top-left corner of the tile

  // Draw the tile by iterating over the pixels
  for (let tileY = 0; tileY < tile.length; tileY++) {
    for (let tileX = 0; tileX < tile[tileY].length; tileX++) {
      const pixelValue = tile[tileY][tileX];
      if (pixelValue > 0) {
        // Skip transparent pixels (0)
        context.fillStyle = colors[pixelValue - 1];
        context.globalAlpha = alpha;
        context.fillRect(tileX * zoomFactor, tileY * zoomFactor, zoomFactor, zoomFactor);
      }
    }
  }

  context.restore();
}
