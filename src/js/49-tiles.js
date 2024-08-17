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
 * Remove a specific tile from the level
 * @param {string} tileName - The name of the tile to remove (e.g., "gong")
 */
function removeTile(tileName) {
  levelData = levelData.filter((element) => element.tile !== tileName);
}

/**
 * Check if the player can move to the specified position
 * @param {number} x - The x-coordinate
 * @param {number} y - The y-coordinate
 * @param {number} dx - The x-direction of movement
 * @param {number} dy - The y-direction of movement
 * @returns {boolean} - True if the player can move to this position, false otherwise
 */
function canMoveTo(x, y, dx = 0, dy = 0) {
  // Check grid boundaries (excluding the border)
  if (x < 1 || x >= LEVEL_WIDTH - 1 || y < 1 || y >= LEVEL_HEIGHT - 1) {
    return false;
  }

  const tileAtTarget = getTileAt(x, y);

  // If the tile is a crate, try to move it
  if (tileAtTarget === 'crate') {
    return moveCrate(x, y, dx, dy); // Move the crate if possible
  }

  // If the player moves onto a gong-trigger, remove the gong
  if (tileAtTarget === 'gong-trigger') {
    removeTile('gong'); // Remove the gong from the level
    return true; // Allow the player to move onto the gong-trigger
  }

  // If the tile is a block, rock, or lock, block movement
  if (![null, 'arrow', 'key'].includes(tileAtTarget)) {
    return false;
  }

  return true;
}

/**
 * Move a crate if possible
 * @param {number} x - The x-coordinate of the crate
 * @param {number} y - The y-coordinate of the crate
 * @param {number} dx - The x-direction of movement
 * @param {number} dy - The y-direction of movement
 * @returns {boolean} - True if the crate was moved, false otherwise
 */

function moveCrate(x, y, dx, dy) {
  const newX = x + dx;
  const newY = y + dy;

  // Check if the tile where the crate should move is free and does not contain another crate
  const tileAtNewPosition = getTileAt(newX, newY);
  if (tileAtNewPosition === null || ['arrow'].includes(tileAtNewPosition)) {
    // Update the crate's position in levelData
    for (const element of levelData) {
      if (element.x === x && element.y === y && element.tile === 'crate') {
        element.x = newX;
        element.y = newY;
        return true;
      }
    }
  }

  return false;
}
