/**
 * Actions on tile interactions
 * @module 50-actions
 */
let movingTile = null;
let tileMoveStartX, tileMoveStartY;
let tileMoveTargetX, tileMoveTargetY;
let tileMoveElapsedTime = 0;

/**
 * Perform the action at the target position
 * @param {number} x - The x-coordinate
 * @param {number} y - The y-coordinate
 * @param {number} dx - The x-direction of movement
 * @param {number} dy - The y-direction of movement
 * @param {Object} tileElement - The tile element object
 */
function tryPerformAction(x, y, dx, dy, tileElement) {
  let hasPerformedAction = false;
  switch (tileElement?.tile) {
    case 'crate':
      if (tryMoveTile(tileElement?.tile, x, y, dx, dy)) {
        hasPerformedAction = true;
      }
      break;
    case 'boulder':
      if (tryMoveTile(tileElement?.tile, x, y, dx, dy)) {
        hasPerformedAction = true;
      }
      break;
    case 'lock':
      if (collectedKeysNumber > 0) {
        hasPerformedAction = true;
        animateTileRemoval('lock', x, y, () => {
          collectedKeysNumber--;
        });
      }
      break;
    case 'block-trigger':
      const blockOrientation = tileElement.orientation || ORIENTATION_UP; // Default orientation is up
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
