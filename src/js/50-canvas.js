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
  drawLevelBackground('sand', 'rock');
  drawLevelElements(levelData);
  backgroundCtx.drawImage(
    canvas,
    0,
    0,
    backgroundCanvas.width,
    backgroundCanvas.height,
  );
}

/**
 * Draw the background of the level with a border
 * @param {string} backgroundTileName - The name of the background tile
 * @param {string} borderTileName - The name of the border tile
 */
function drawLevelBackground(backgroundTileName, borderTileName) {
  backgroundTile = GAME_SPRITES[backgroundTileName].tiles[0];
  backgroundColors = DEFAULT_TILE_COLORS[backgroundTileName];
  const borderTile = GAME_SPRITES[borderTileName].tiles[0];
  const borderColors = DEFAULT_TILE_COLORS[borderTileName];

  for (let y = 0; y < LEVEL_HEIGHT; y++) {
    for (let x = 0; x < LEVEL_WIDTH; x++) {
      drawTile(backgroundTile, backgroundColors, x, y);
      if (
        x === 0 ||
        x === LEVEL_WIDTH - 1 ||
        y === 0 ||
        y === LEVEL_HEIGHT - 1
      ) {
        drawTile(borderTile, borderColors, x, y);
      } else {
      }
    }
  }
}

/**
 * Draw the level background elements
 * @param {Array} levelData - The level data array with tile information
 */
function drawLevelElements(levelData) {
  levelData.forEach((element) => {
    const tile = GAME_SPRITES[element.tile];
    const frame = tile.tiles[element.animationFrame || 0]; // Get the current frame
    const colors = element.color || DEFAULT_TILE_COLORS[element.tile];
    const x = element.x;
    const y = element.y;
    const orientation = element.orientation || ORIENTATION_UP;
    const scale = element.scale || 1;

    drawTile(frame, colors, x, y, orientation, scale);
  });
}

/**
 * Draw a tile on the canvas at the specified position, color, and orientation
 * @param {number[][]} tile - The tile to draw
 * @param {string[]} colors - The colors for the tile
 * @param {number} x - The x-coordinate of the tile
 * @param {number} y - The y-coordinate of the tile
 * @param {number} [orientation=ORIENTATION_UP] - The orientation of the tile
 */
function drawTile(
  tile,
  colors,
  x,
  y,
  orientation = ORIENTATION_UP,
  scale = 1,
  context = ctx,
) {
  context.save();

  const halfTileSize = (TILE_SIZE * zoomFactor) / 2;

  const tilePosition = (coordinate) =>
    (coordinate + 0.5) * TILE_SIZE * zoomFactor; // Add 0.5 to center the tile to be able to rotate it
  context.translate(tilePosition(x), tilePosition(y));
  context.rotate((orientation * Math.PI) / 2);
  ctx.scale(scale, scale); // Apply scaling
  context.translate(-halfTileSize, -halfTileSize);

  // Draw the tile by iterating over the pixels
  for (let tileY = 0; tileY < tile.length; tileY++) {
    for (let tileX = 0; tileX < tile[tileY].length; tileX++) {
      const pixelValue = tile[tileY][tileX];
      if (pixelValue > 0) {
        // Skip transparent pixels (0)
        context.fillStyle = colors[pixelValue - 1];
        context.fillRect(
          tileX * zoomFactor,
          tileY * zoomFactor,
          zoomFactor,
          zoomFactor,
        );
      }
    }
  }

  context.restore();
}
