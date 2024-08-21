/**
 * Encode a level into a compact string format
 * @param {Array} levelData - The level data to encode
 * @returns {string} - The encoded level string
 */
function encodeLevel(levelData) {
  let encodedString = '';
  let previousTileCharacter = '';
  let previousOrientation = '';
  let currentTileCounter = 0;

  for (let y = 1; y <= LEVEL_HEIGHT - 2; y++) {
    for (let x = 1; x <= LEVEL_WIDTH - 2; x++) {
      const currentTile = getTileAt(x, y);
      const currentTileCharacter = getTileCharacter(currentTile?.tile);
      const currentTileOrientation = getOrientationSymbol(currentTile?.orientation);

      if (currentTileCharacter === previousTileCharacter && currentTileOrientation === previousOrientation) {
        ++currentTileCounter;
      } else {
        encodedString += previousTileCharacter + previousOrientation;
        if (currentTileCounter > 1) {
          encodedString += `${currentTileCounter}`;
        }

        previousTileCharacter = currentTileCharacter; // Reset the empty count
        previousOrientation = currentTileOrientation;
        currentTileCounter = 1;
      }
    }
  }

  // Add the last tile
  encodedString += previousTileCharacter + previousOrientation;
  if (currentTileCounter > 1) {
    encodedString += `${currentTileCounter}`;
  }

  encodedString = encodedString.replace(/-[0-9]+$/, ''); // Remove empty tiles

  return encodedString;
}

/**
 * Convert a tile character back to its tile name
 */
function getTileName(tileChar) {
  const tileNames = Object.keys(TILE_DATA);
  const tileIndex = tileChar.charCodeAt(0) - 'A'.charCodeAt(0);
  return tileNames[tileIndex];
}

/**
 * Get the character representing a tile
 * @param {string} tileName - The name of the tile
 * @returns {string} - The character representing the tile
 */
function getTileCharacter(tileName) {
  if (!tileName) {
    return '-';
  }

  const tileIndex = Object.keys(TILE_DATA).indexOf(tileName);
  return String.fromCharCode('A'.charCodeAt(0) + tileIndex);
}

/**
 * Get the symbol representing an orientation
 * @param {number} orientation - The orientation value
 * @returns {string} - The symbol representing the orientation
 */
function getOrientationSymbol(orientation) {
  const orientationMap = {
    1: '+', // Right
    2: '*', // Down
    3: '/', // Left
  };

  return orientationMap[orientation] || ''; // Par défaut, aucune orientation spécifique
}
