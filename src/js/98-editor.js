/**
 * Initialize the level editor
 */
function initEditor() {
  // Disable image smoothing for sharp pixelated look
  currentLevel = 0;
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

function drawEditorSelectedTile() {
  // Dessiner la tuile sélectionnée avec une opacité de 50%
  const selectedTile = $editorTileSelector.value;
  const selectedOrientation = parseInt($orientationSelect.value);

  drawTile(TILE_DATA[selectedTile].tiles[0], TILE_DATA[selectedTile].colors, currentEditorTile.x, currentEditorTile.y, {
    orientation: TILE_DATA[selectedTile].canChangeOrientation ? selectedOrientation : ORIENTATION_UP,
    scale: 1,
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
      let encoded = encodeLevel(levels[currentLevel].levelData);
    }
  } else if (e.buttons === 2) {
    // Right mouse button (remove tile)
    removeTile($editorTileSelector.value, currentEditorTile.x, currentEditorTile.y);
    let encoded = encodeLevel(levels[currentLevel].levelData);
  }
}
