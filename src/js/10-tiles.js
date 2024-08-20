/**
 * Get the tile at the specified position
 * @param {number} x - The x-coordinate
 * @param {number} y - The y-coordinate
 * @returns {string} - The name of the tile at this position or null if no element is found
 */
function getTileAt(x, y, type = [], levelIndex = currentLevel) {
  let lastTileAt = null;
  let levelData = levels[levelIndex].levelData;
  for (const element of levelData) {
    if (element.x === x && element.y === y) {
      if (type.length > 0) {
        if (type.includes(element.tile)) {
          lastTileAt = element;
        }
      } else {
        lastTileAt = element;
      }
    }
  }
  return lastTileAt;
}

/**
 * Remove a specific tile or multiple tiles from the level.
 * @param {string} tileName - The name of the tile to remove (e.g., "gong").
 * @param {number} [x] - The x-coordinate of the tile to remove.
 * @param {number} [y] - The y-coordinate of the tile to remove.
 */
function removeTile(tileName, x, y) {
  levels[currentLevel].levelData = levels[currentLevel].levelData.filter((element) => {
    // Remove tile if it matches the name and, if provided, coordinates
    return element.tile !== tileName || element.x !== x || element.y !== y;
  });
}

/**
 * Add a new tile to the level data
 * @param {string} tile - The name of the tile to add
 * @param {number} x - The x-coordinate of the tile
 * @param {number} y - The y-coordinate of the tile
 * @param {object} [options] - Additional options for the tile
 */
function addTile(tile, x, y, options = {}) {
  levels[currentLevel].levelData.push({ tile, x, y, ...options });
}

/**
 * Move a crate if possible
 * @param {number} x - The x-coordinate of the crate
 * @param {number} y - The y-coordinate of the crate
 * @param {number} dx - The x-direction of movement
 * @param {number} dy - The y-direction of movement
 * @returns {boolean} - True if the crate was moved, false otherwise
 */
function tryMoveTile(tileName, x, y, dx, dy) {
  let maxDistance = 1;
  if (tileName === 'boulder') {
    maxDistance = LEVEL_WIDTH;
  }

  let distance = 0;
  while (distance < maxDistance) {
    let checkedX = x + (distance + 1) * dx;
    let checkedY = y + (distance + 1) * dy;
    let tileAtNewPosition = getTileAt(checkedX, checkedY)?.tile || null;
    if (
      isInLevelBounds(checkedX, checkedY) &&
      (tileAtNewPosition === null || ['arrow', 'hole', 'trap', 'hole-filled'].includes(tileAtNewPosition))
    ) {
      distance++;
    } else {
      break;
    }
  }

  if (distance > 0) {
    // Update the crate's position in levelData
    let levelData = levels[currentLevel].levelData;
    for (const element of levelData) {
      if (element.x === x && element.y === y && element.tile === tileName) {
        startTileAnimation(element, x + distance * dx, y + distance * dy);
        for (let i = 1; i < distance; i++) {
          setTimeout(() => {
            playActionSound(tileName);
          }, TILE_CELL_MOVE_DURATION * i);
        }
        return true;
      }
    }
  }

  return false;
}

/**
 * Start the animation of a crate moving from one position to another
 * @param {number} crateX - The x-coordinate of the crate
 * @param {number} crateY - The y-coordinate of the crate
 * @param {number} dx - The x-direction of movement
 * @param {number} dy - The y-direction of movement
 */
function startTileAnimation(tile, targetX, targetY) {
  movingTile = tile;
  tileMoveStartX = tile.x;
  tileMoveStartY = tile.y;
  tileMoveTargetX = targetX;
  tileMoveTargetY = targetY;
  tileMoveElapsedTime = 0;
}

/**
 * Remove a block and recursively check the adjacent block in the direction of the block's orientation.
 * @param {number} x - The x-coordinate of the block
 * @param {number} y - The y-coordinate of the block
 * @param {number} dx - The x-direction of movement (based on block orientation)
 * @param {number} dy - The y-direction of movement (based on block orientation)
 */
function removeConnectedBlocks(x, y, dx, dy) {
  // Remove the current block
  animateTileRemoval('block-trigger', x, y);
  animateTileRemoval('block', x, y);
  playActionSound('block');

  // Calculate the position of the next block in the same direction
  const nextX = x + dx;
  const nextY = y + dy;

  // Check if the next position contains another block
  const nextTile = getTileAt(nextX, nextY)?.tile;
  if (nextTile === 'block') {
    // Get the orientation of the next block
    const nextBlockElement = levels[currentLevel].levelData.find(
      (element) => element.x === nextX && element.y === nextY && element.tile === 'block',
    );
    if (nextBlockElement) {
      const nextBlockOrientation = nextBlockElement.orientation || ORIENTATION_UP;

      // Calculate the new dx and dy based on the next block's orientation
      let newDx = 0;
      let newDy = 0;

      if (nextBlockOrientation === ORIENTATION_LEFT) {
        newDx = -1;
      } else if (nextBlockOrientation === ORIENTATION_RIGHT) {
        newDx = 1;
      } else if (nextBlockOrientation === ORIENTATION_UP) {
        newDy = -1;
      } else if (nextBlockOrientation === ORIENTATION_DOWN) {
        newDy = 1;
      }

      // After a short delay, remove the next block and continue recursively in the new direction
      setTimeout(() => {
        removeConnectedBlocks(nextX, nextY, newDx, newDy);
      }, 120); // 200ms delay for visual effect
    }
  }
}

/**
 * Animate the removal of one or more tiles by scaling them down to 0
 * @param {string} tileName - The name of the tile to remove (e.g., "block", "gong")
 * @param {number|null} x - The x-coordinate of the tile to remove, or null to remove all matching tiles
 * @param {number|null} y - The y-coordinate of the tile to remove, or null to remove all matching tiles
 * @param {function} callback - A callback function to execute once the animation is complete
 * @param {number} duration - The duration of the animation in milliseconds
 */
function animateTileRemoval(tileName, x = null, y = null, callback, duration = DEFAULT_REMOVAL_DURATION) {
  // Find all matching tiles in levelData
  const tilesToAnimate = levels[currentLevel].levelData.filter((element) => {
    return element.tile === tileName && (x === null || (element.x === x && element.y === y));
  });

  // Mark all tiles as being removed and initialize animation properties
  tilesToAnimate.forEach((tile) => {
    tile.isBeingRemoved = true;
    tile.scale = 1; // Initial scale
    tile.elapsed = 0; // Reset elapsed time for removal animation
    tile.removalDuration = duration; // Set removal duration
    tile.removeCallback = callback; // Store the callback
  });
}
