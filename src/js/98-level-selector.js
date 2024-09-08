let levelSelectionIndex = 1; // Index of the currently selected level
const totalLevelNumber = encodedLevels.length - 1; // Total number of levels
const levelsPerRow = 4; // Define how many levels per row
const levelPreviewSize = 50; // Size of each level preview on the grid
const levelSpacing = 10; // Space between level previews

function drawLevelSelectorScreen() {
  drawBackground(); // Utiliser le fond comme pour les autres écrans

  const gridStartX = 50; // X-coordinate for the start of the grid
  const gridStartY = 20; // Y-coordinate for the start of the grid

  for (let i = 1; i <= totalLevelNumber; i++) {
    const isHighlighted = i === levelSelectionIndex;

    const x = gridStartX + ((i - 1) % levelsPerRow) * (levelPreviewSize + levelSpacing);
    const y = gridStartY + Math.floor((i - 1) / levelsPerRow) * (levelPreviewSize / 2 + levelSpacing);

    drawLevelPreview(i, x, y, levelPreviewSize, isHighlighted);
  }
}

// This function draws the level preview (a rectangle for now, can be improved with actual level details)
function drawLevelPreview(levelIndex, x, y, size, isHighlighted) {
  const previewCanvas = document.createElement('canvas');
  const previewCtx = previewCanvas.getContext('2d');
  previewCanvas.width = canvas.width;
  previewCanvas.height = canvas.height;
  previewCanvas.imageSmoothingEnabled = false;

  // Draw the level at a smaller scale
  drawLevelMiniature(levelIndex, previewCtx, size);

  // Draw the preview on the main canvas
  ctx.drawImage(previewCanvas, x * zoomFactor, y * zoomFactor, size * zoomFactor, (size / 2) * zoomFactor);

  // Highlight the selected level
  if (isHighlighted) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ff0';
    ctx.strokeRect(x * zoomFactor, y * zoomFactor, size * zoomFactor, (size / 2) * zoomFactor);
  }

  // Optionally, display the level number inside the preview box
  writeText({
    ctx: ctx,
    x: x + size / 2 - 5,
    y: y + size / 4,
    text: `L${levelIndex}`,
    color: isHighlighted ? '#ff0' : '#000',
  });
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

function handleLevelSelectionKeydown(key, e) {
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
    case 'Enter':
      loadLevel(levelSelectionIndex); // Load the selected level
      break;
  }
}

function loadLevel(levelIndex) {
  currentLevel = levelIndex; // Adjust this based on your level management logic
  switchMode('game'); // Start the game mode
}

// Ensure this screen and input handling is integrated with your main game loop
