/**
 * Get the tile at the specified position
 * @param {number} x - The x-coordinate
 * @param {number} y - The y-coordinate
 * @returns {string} - The name of the tile at this position or null if no element is found
 */
function getTileAt(x, y) {
  let lastTileAt = null;
  for (const element of levelData) {
    if (element.x === x && element.y === y) {
      lastTileAt = element.tile;
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
function removeTile(tileName, x = null, y = null) {
  levelData = levelData.filter((element) => {
    // Remove tile if it matches the name and, if provided, coordinates
    return (
      element.tile !== tileName ||
      (x !== null && y !== null && (element.x !== x || element.y !== y))
    );
  });
}

/**
 * Move a crate if possible
 * @param {number} x - The x-coordinate of the crate
 * @param {number} y - The y-coordinate of the crate
 * @param {number} dx - The x-direction of movement
 * @param {number} dy - The y-direction of movement
 * @returns {boolean} - True if the crate was moved, false otherwise
 */

function tryMoveCrate(x, y, dx, dy) {
  const newX = x + dx;
  const newY = y + dy;

  // Check if the tile where the crate should move is free and does not contain another crate
  const tileAtNewPosition = getTileAt(newX, newY);
  if (
    isInBounds(newX, newX) &&
    (tileAtNewPosition === null || ['arrow'].includes(tileAtNewPosition))
  ) {
    // Update the crate's position in levelData
    for (const element of levelData) {
      if (element.x === x && element.y === y && element.tile === 'crate') {
        startCrateAnimation(element, dx, dy);
        playActionSound('crate');
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
function startCrateAnimation(crate, dx, dy) {
  movingCrate = crate;
  crateMoveStartX = crate.x;
  crateMoveStartY = crate.y;
  crateMoveTargetX = crateMoveStartX + dx;
  crateMoveTargetY = crateMoveStartY + dy;
  crateMoveElapsedTime = 0;
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
  animateTileRemoval('block', x, y);

  // Calculate the position of the next block in the same direction
  const nextX = x + dx;
  const nextY = y + dy;

  // Check if the next position contains another block
  const nextTile = getTileAt(nextX, nextY);
  if (nextTile === 'block') {
    // Get the orientation of the next block
    const nextBlockElement = levelData.find(
      (element) =>
        element.x === nextX && element.y === nextY && element.tile === 'block',
    );
    if (nextBlockElement) {
      const nextBlockOrientation =
        nextBlockElement.orientation || ORIENTATION_UP;

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
function animateTileRemoval(
  tileName,
  x = null,
  y = null,
  callback,
  duration = DEFAULT_REMOVAL_DURATION,
) {
  // Find all matching tiles in levelData
  const tilesToAnimate = levelData.filter((element) => {
    return (
      element.tile === tileName &&
      (x === null || (element.x === x && element.y === y))
    );
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
