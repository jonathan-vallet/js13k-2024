/**
 * Actions on tile interactions
 * @module 50-actions
 */
let movingCrate = null;
let crateMoveStartX, crateMoveStartY;
let crateMoveTargetX, crateMoveTargetY;
let crateMoveElapsedTime = 0;
const CRATE_MOVE_DURATION = 200;

/**
 * Perform the action at the target position
 * @param {number} x - The x-coordinate
 * @param {number} y - The y-coordinate
 * @param {number} dx - The x-direction of movement
 * @param {number} dy - The y-direction of movement
 * @param {string} tileAtTarget - The name of the tile at the target position
 * @param {Object} tileElement - The tile element object
 */
function tryPerformAction(x, y, dx, dy, tileAtTarget, tileElement) {
  let hasPerformedAction = false;
  switch (tileAtTarget) {
    case 'crate':
      if (tryMoveCrate(x, y, dx, dy)) {
        hasPerformedAction = true;
      }
      break;
    case 'key':
      hasPerformedAction = true;
      removeTile('key');
      collectedKeysNumber++;
      break;
    case 'lock':
      if (collectedKeysNumber > 0) {
        hasPerformedAction = true;
        animateTileRemoval('lock', x, y, () => {
          collectedKeysNumber--;
        });
      }
      break;
    case 'flag':
      resetLevel(); // Reset the level on reaching the flag
      return false; // Prevent further movement
      break;
    case 'block':
      const blockElement = levelData.find(
        (element) =>
          element.x === x && element.y === y && element.tile === 'block',
      );
      if (blockElement) {
        const blockOrientation = blockElement.orientation || ORIENTATION_UP; // Default orientation is up

        // Check if the block is of green color and if the character is pushing it in the correct direction
        if (blockElement.isPushable) {
          if (
            (blockOrientation === ORIENTATION_LEFT && dx === -1) ||
            (blockOrientation === ORIENTATION_RIGHT && dx === 1) ||
            (blockOrientation === ORIENTATION_UP && dy === -1) ||
            (blockOrientation === ORIENTATION_DOWN && dy === 1)
          ) {
            // Remove the block and start removing connected blocks recursively
            removeConnectedBlocks(x, y, dx, dy);
            hasPerformedAction = true;
          }
        }
      }
      break;
    case 'gong-trigger':
      if (!tileElement.triggered) {
        tileElement.triggered = true;
        hasPerformedAction = true;
        animateTileRemoval('gong');
      }
      break;
  }

  return hasPerformedAction;
}
