function decodeLevel(encodedString) {
  const levelData = [];
  let characterInitialX = 0;
  let characterInitialY = 0;
  let tileIndex = 0;

  // Regex pattern to match the tile, optional orientation, and optional count
  const regex = /([A-Z\-])([xyz]?)(\d*)/g;
  let match;

  while ((match = regex.exec(encodedString)) !== null) {
    const tileChar = match[1]; // The tile symbol (e.g., A, B, or -)
    const orientationSymbol = match[2] || ''; // Optional orientation symbol
    const tileCount = parseInt(match[3] || '1', 10); // Optional tile count, default to 1
    const tileName = tileChar === '-' ? null : getTileName(tileChar); // Convert tileChar to tileName or handle empty
    const orientation = getOrientationFromSymbol(orientationSymbol); // Get orientation from symbol

    for (let i = 0; i < tileCount; i++) {
      let x = (tileIndex % (LEVEL_WIDTH - 2)) + 1;
      let y = Math.floor(tileIndex / (LEVEL_WIDTH - 2)) + 1;
      if (tileName) {
        if (tileName === 'key') {
          levelData.push({ tile: 'key-holder', x, y, orientation });
        }
        levelData.push({ tile: tileName, x, y, orientation });

        if (tileName === 'spawn-current') {
          characterInitialX = x;
          characterInitialY = y;
        }
      }
      ++tileIndex;
    }
  }

  // Place crate and boulder tiles after all other tiles
  for (let i = 0; i < levelData.length; i++) {
    const tile = levelData[i];
    if (['crate', 'boulder'].includes(tile.tile)) {
      levelData.splice(i, 1);
      levelData.push(tile);
    }
  }

  const level = {
    characterInitialX,
    characterInitialY,
    levelData,
  };
  return level;
}

/**
 * Convert an orientation symbol to a numeric value
 */
function getOrientationFromSymbol(symbol) {
  switch (symbol) {
    case 'x':
      return 1;
    case 'y':
      return 2;
    case 'z':
      return 3;
    default:
      return 0;
  }
}

/**
 * Convert a tile character back to its tile name
 */
function getTileName(tileChar) {
  const tileNames = Object.keys(TILE_DATA);
  const tileIndex = tileChar.charCodeAt(0) - 'A'.charCodeAt(0);
  return tileNames[tileIndex];
}
