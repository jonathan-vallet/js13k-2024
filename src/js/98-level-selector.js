// Cette fonction est appelée lorsque l'écran de sélection des niveaux est initialisé
function initLevelPreviews() {
  for (let i = 1; i <= totalLevelNumber; i++) {
    const previewCanvas = document.createElement('canvas');
    const previewCtx = previewCanvas.getContext('2d');
    previewCanvas.width = canvas.width;
    previewCanvas.height = canvas.height;
    previewCtx.imageSmoothingEnabled = false;

    // Dessiner la miniature du niveau
    drawLevelMiniature(i, previewCtx, levelPreviewImageListize);

    // Stocker la miniature dans le tableau
    levelPreviewImageList[i] = previewCanvas;
  }
}

// Fonction pour dessiner l'écran de sélection de niveau
function drawLevelSelectorScreen() {
  drawBackground();

  const gridStartX = 50; // X-coordinate for the start of the grid
  const gridStartY = 20; // Y-coordinate for the start of the grid

  for (let i = 1; i <= totalLevelNumber; i++) {
    const isHighlighted = i === levelSelectionIndex;

    const x = gridStartX + ((i - 1) % levelsPerRow) * (levelPreviewImageListize + levelSpacing);
    const y = gridStartY + Math.floor((i - 1) / levelsPerRow) * (levelPreviewImageListize / 2 + levelSpacing);

    drawLevelPreview(i, x, y, levelPreviewImageListize, isHighlighted);
  }

  // if all levels are completed, display a message
  if (getLocalStorage('completedLevelList')?.length >= totalLevelNumber) {
    writeText({
      ctx: ctx,
      x: 75,
      y: 65,
      text: 'CONGRATULATIONS!',
      color: COLOR_SELECTED,
      scale: 1.5,
    });
    writeText({
      ctx: ctx,
      x: 80,
      y: 132,
      text: 'YOU ESCAPED ALL LEVELS WITHIN 13 STEPS!',
      color: COLOR_SELECTED,
    });
    writeText({
      ctx: ctx,
      x: 55,
      y: 145,
      text: 'CREATE AND SHARE YOUR OWN LEVELS USING LEVEL EDITOR',
      color: COLOR_SELECTED,
    });

    drawTile(TILE_DATA['star'].tiles[0], TILE_DATA['star'].colors, 2, 7, { scale: 2 });
    drawTile(TILE_DATA['star'].tiles[0], TILE_DATA['star'].colors, 17, 7, { scale: 2 });
  }
}

/**
 * Draw the level preview on the screen
 * @param {number} levelIndex - The index of the level
 * @param {number} x - The x-coordinate of the preview
 * @param {number} y - The y-coordinate of the preview
 * @param {number} size - The size of the preview
 * @param {boolean} isHighlighted - Whether the preview is highlighted
 */
function drawLevelPreview(levelIndex, x, y, size, isHighlighted) {
  // Draw the level preview image
  const previewCanvas = levelPreviewImageList[levelIndex];
  ctx.drawImage(previewCanvas, x * zoomFactor, y * zoomFactor, size * zoomFactor, (size / 2) * zoomFactor);

  // Draw a border around the preview if highlighted
  if (isHighlighted) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = COLOR_SELECTED;
    ctx.strokeRect(x * zoomFactor, y * zoomFactor, size * zoomFactor, (size / 2) * zoomFactor);
  }

  // Add the level number
  writeText({
    ctx: ctx,
    x: x + size / 2 - 5,
    y: y + size / 4,
    text: `L${levelIndex}`,
    color: isHighlighted ? COLOR_SELECTED : COLOR_TEXT,
  });

  // If level is completed, draw a star tile bottom right
  const completedLevelList = getLocalStorage('completedLevelList') || [];
  if (completedLevelList.includes(levelIndex)) {
    drawTile(TILE_DATA['star'].tiles[0], TILE_DATA['star'].colors, x / 16 - 0.3, y / 16 - 0.5, { scale: 0.8 });
  }
}

function drawLevelMiniature(levelIndex, previewCtx, size) {
  currentLevel = levelIndex;

  // Save the original context
  previewCtx.save();

  // Draw the background and elements of the level
  drawLevelBackground('sand', 'rock', previewCtx);
  drawLevelElements(levels[levelIndex].levelData, true, previewCtx);

  // Restore the context
  previewCtx.restore();
}

function handleLevelSelectionKeydown(key) {
  switch (key) {
    case 'up':
      if (levelSelectionIndex >= levelsPerRow) levelSelectionIndex -= levelsPerRow;
      break;
    case 'down':
      if (levelSelectionIndex + levelsPerRow <= totalLevelNumber) levelSelectionIndex += levelsPerRow;
      break;
    case 'left':
      if (levelSelectionIndex > 1) levelSelectionIndex--;
      break;
    case 'right':
      if (levelSelectionIndex < totalLevelNumber) levelSelectionIndex++;
      break;
    case 'action':
      loadLevel(levelSelectionIndex); // Load the selected level
      break;
  }
}

function loadLevel(levelIndex) {
  currentLevel = levelIndex; // Adjust this based on your level management logic
  // If level was already completed, reset it
  resetLevel();
  switchMode('game'); // Start the game mode
}

// Ensure this screen and input handling is integrated with your main game loop
