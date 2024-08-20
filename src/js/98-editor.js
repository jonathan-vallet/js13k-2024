/**
 * Initialize the level editor
 */
function initEditor() {
  // Disable image smoothing for sharp pixelated look
  editorCtx.imageSmoothingEnabled = false;
  currentLevel = 2;
  drawLevelBackground('sand', 'rock');
  startLevel(currentLevel);

  // Fill tile selector with available tiles
  Object.keys(TILE_DATA).forEach((tileName) => {
    if (TILE_DATA[tileName].limit !== 0) {
      let option = document.createElement('option');
      option.value = tileName;
      option.text = tileName;
      $editorTileSelector.appendChild(option);
    }
  });
}

let isMouseDown = false; // Track whether the mouse is being held down

// Show selected tile in editor when hovering
editorCanvas.addEventListener('mousemove', (e) => {
  e.preventDefault();
  if (currentMode === 'editor') {
    const rect = editorCanvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    currentEditorTile.x = Math.floor(mouseX / (TILE_SIZE * zoomFactor));
    currentEditorTile.y = Math.floor(mouseY / (TILE_SIZE * zoomFactor));

    // Draw tile preview at current mouse position
    drawEditorSelectedTile();

    // Add tile while dragging the mouse
    if (isMouseDown) {
      handleEditorClick(e);
    }
  }
});

editorCanvas.addEventListener('mousewheel', (e) => {
  if (currentMode === 'editor') {
    // Changes tile orientation
    e.preventDefault();
    const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

    $orientationSelect.value = (parseInt($orientationSelect.value) + delta + 4) % 4;
    drawEditorSelectedTile();
  }
});

editorCanvas.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  handleEditorClick(e);
});

editorCanvas.addEventListener('mouseup', (e) => {
  isMouseDown = false;
});

function drawEditorSelectedTile() {
  // Dessiner la tuile sélectionnée avec une opacité de 50%
  const selectedTile = $editorTileSelector.value;
  const selectedOrientation = parseInt($orientationSelect.value);

  drawTile(TILE_DATA[selectedTile].tiles[0], TILE_DATA[selectedTile].colors, currentEditorTile.x, currentEditorTile.y, {
    orientation: TILE_DATA[selectedTile].canChangeOrientation ? selectedOrientation : ORIENTATION_UP,
    scale: 1,
    context: editorCtx,
    flipHorizontally: false,
    alpha: 0.5,
  });
}

function handleEditorClick(e) {
  if (e.buttons === 1) {
    // Left mouse button
    if (
      !getTileAt(currentEditorTile.x, currentEditorTile.y) &&
      isInLevelBounds(currentEditorTile.x, currentEditorTile.y)
    ) {
      addTile($editorTileSelector.value, currentEditorTile.x, currentEditorTile.y, {
        orientation: TILE_DATA[$editorTileSelector.value].canChangeOrientation
          ? parseInt($orientationSelect.value)
          : ORIENTATION_UP,
      });
    }
  } else if (e.buttons === 2) {
    // Right mouse button (remove tile)
    removeTile($editorTileSelector.value, currentEditorTile.x, currentEditorTile.y);
  }
}
