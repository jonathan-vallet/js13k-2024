function setZoomFactor() {
  zoomFactor = Math.min(
    Math.floor(window.innerWidth / (LEVEL_WIDTH * TILE_SIZE)),
    Math.floor(window.innerHeight / (LEVEL_HEIGHT * TILE_SIZE)),
  );
  canvas.width = LEVEL_WIDTH * TILE_SIZE * zoomFactor;
  canvas.height = LEVEL_HEIGHT * TILE_SIZE * zoomFactor;
  initLevel();
}

function initGame() {
  // Disable image smoothing for sharp pixelated look
  ctx.imageSmoothingEnabled = false;
  window.addEventListener('resize', setZoomFactor);
  // Adjust the canvas size to fit the level size
  setZoomFactor();
}

function initLevel() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawLevel('sand', 'rock');
  drawLevelElements(levelData);
}

initGame();

function drawLevel(backgroundTileName, borderTileName) {
  const backgroundTile = GAME_SPRITES[backgroundTileName].tiles[0];
  const backgroundColors = DEFAULT_TILE_COLORS[backgroundTileName];
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

function drawLevelElements(levelData) {
  levelData.forEach((element) => {
    const tileName = element.tile;
    const tile = GAME_SPRITES[tileName].tiles[0]; // Display the first tile only
    const colors = element.color || DEFAULT_TILE_COLORS[tileName];
    const x = element.x;
    const y = element.y;
    const orientation = element.orientation || ORIENTATION_UP;

    // Dessiner la tuile à la position spécifiée (x, y) avec le facteur de zoom
    drawTile(tile, colors, x, y, orientation);
  });
}

function drawTile(tile, colors, x, y, orientation = ORIENTATION_UP) {
  ctx.save();

  const halfTileSize = (TILE_SIZE * zoomFactor) / 2;

  const tilePosition = (coordinate) =>
    (coordinate + 0.5) * TILE_SIZE * zoomFactor; // Add 0.5 to center the tile and multiply by zoom factor
  ctx.translate(tilePosition(x), tilePosition(y));
  ctx.rotate((orientation * Math.PI) / 2);
  ctx.translate(-halfTileSize, -halfTileSize);

  // Dessiner la tuile avec les couleurs fournies
  for (let tileY = 0; tileY < tile.length; tileY++) {
    for (let tileX = 0; tileX < tile[tileY].length; tileX++) {
      const pixelValue = tile[tileY][tileX];
      if (pixelValue > 0 && pixelValue <= colors.length) {
        ctx.fillStyle = colors[pixelValue - 1];
        ctx.fillRect(
          tileX * zoomFactor,
          tileY * zoomFactor,
          zoomFactor,
          zoomFactor,
        );
      }
    }
  }

  ctx.restore();
}
