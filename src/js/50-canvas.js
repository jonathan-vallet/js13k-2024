/**
 * Canvas rendering functions
 * @module 50-canvas
 */

/**
 * Refresh the canvas by redrawing the level and the character
 */
function refreshCanvas() {
  drawLevel();
  refreshUI();
  drawCharacter();
}

/**
 * Draw the level background and elements
 */
function drawLevel() {
  // draw background image
  ctx.drawImage(backgroundCanvas, 0, 0, canvas.width, canvas.height);
  drawLevelElements(levelData);
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

      // Draw all static elements
      const element = getTileAt(x, y);
      if (STATIC_TILE_LIST.includes(element?.tile)) {
        drawTile(TILE_DATA[element.tile].tiles[0], TILE_DATA[element.tile].colors, x, y);
      }
    }
  }

  textManager.text({
    ctx: backgroundCtx,
    x: 10,
    y: 10,
    text: '0',
    color: 'rgb(255,0,0)',
  });

  backgroundCtx.drawImage(canvas, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
}

/**
 * Draw the level background elements
 * @param {Array} levelData - The level data array with tile information
 */
function drawLevelElements(levelData) {
  let drawnNumbers = 0;
  levelData.forEach((element) => {
    const tile = TILE_DATA[element.tile];
    if (STATIC_TILE_LIST.includes(element.tile)) {
      return;
    }
    const frame = tile.tiles[element.animationFrame || 0]; // Get the current frame
    const colors = element.color || TILE_DATA[element.tile].colors;
    const x = element.x;
    const y = element.y;
    const orientation = element.orientation || ORIENTATION_UP;
    const scale = element.scale || 1;
    drawTile(frame, colors, x, y, { orientation, scale });
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
  const { orientation = ORIENTATION_UP, scale = tile.scale || 1, context = ctx, flipHorizontally = false } = options;

  context.save();

  const halfTileSize = (TILE_SIZE * zoomFactor) / 2;
  context.translate((x + 0.5) * TILE_SIZE * zoomFactor, (y + 0.5) * TILE_SIZE * zoomFactor);

  // Apply horizontal flip if necessary
  let scaleDirection = 1;
  if (flipHorizontally) {
    scaleDirection = -1;
  }

  context.scale(scale * scaleDirection, scale); // Apply scaling
  context.rotate((orientation * Math.PI) / 2); // Apply rotation
  context.translate(-halfTileSize, -halfTileSize); // Move to the top-left corner of the tile

  // Draw the tile by iterating over the pixels
  for (let tileY = 0; tileY < tile.length; tileY++) {
    for (let tileX = 0; tileX < tile[tileY].length; tileX++) {
      const pixelValue = tile[tileY][tileX];
      if (pixelValue > 0) {
        // Skip transparent pixels (0)
        context.fillStyle = colors[pixelValue - 1];
        context.fillRect(tileX * zoomFactor, tileY * zoomFactor, zoomFactor, zoomFactor);
      }
    }
  }

  context.restore();
}
