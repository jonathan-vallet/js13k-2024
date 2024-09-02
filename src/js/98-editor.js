/**
 * Initialize the level editor
 */
function initEditor() {
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
    orientation:
      TILE_DATA[selectedTile].canChangeOrientation || TILE_DATA[selectedTile].useOrientationForColor
        ? selectedOrientation
        : ORIENTATION_UP,
    useOrientationForColor: TILE_DATA[selectedTile].useOrientationForColor,
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
        orientation:
          TILE_DATA[$editorTileSelector.value].canChangeOrientation ||
          TILE_DATA[$editorTileSelector.value].useOrientationForColor
            ? parseInt($orientationSelect.value)
            : ORIENTATION_UP,
      });
      let encoded = encodeLevel(levels[currentLevel].levelData);
    }
  } else if (e.buttons === 2) {
    // Right mouse button (remove tile at position)
    let tile = getTileAt(currentEditorTile.x, currentEditorTile.y);
    if (tile) {
      removeTile(tile.tile, currentEditorTile.x, currentEditorTile.y);
      encodeLevel(levels[currentLevel].levelData);
    }
  }
}

$('#editorTestLevelButton').addEventListener('click', () => {
  if (!checkEditorLevelValidity()) {
    return;
  }

  let encoded = encodeLevel(levels[currentLevel].levelData);
  window.open(`./index.html?level=${encoded}`);
});

let $editorMessage = $('#editorMessage');

function checkEditorLevelValidity() {
  let levelData = levels[currentLevel].levelData;
  let playerSpawnNumber = 0;
  let flagNumber = 0;
  levelData.forEach((tile) => {
    if (tile.tile === 'spawn-current') {
      playerSpawnNumber++;
    } else if (tile.tile === 'flag') {
      flagNumber++;
    }
  });

  let message = '';
  let isValid = playerSpawnNumber === 1 && flagNumber === 1;
  if (!isValid) {
    if (playerSpawnNumber !== 1) {
      message += 'There must be exactly one player spawn point.\n';
    }
    if (flagNumber !== 1) {
      message += 'There must be exactly one flag.\n';
    }
  }

  $editorMessage.textContent = message;
  return isValid;
}
