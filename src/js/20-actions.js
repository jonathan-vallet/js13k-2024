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
    case 'boulder':
      if (tryMoveTile(tileElement?.tile, x, y, dx, dy)) {
        hasPerformedAction = true;
        let switchTrigger = getTileAt(x, y, ['switch-trigger']);
        if (switchTrigger) {
          invertSwitches(switchTrigger.orientation);
        }
      }
      break;
    case 'lock':
      if (collectedKeysNumber > 0) {
        hasPerformedAction = true;
        animateTileRemoval('lock', x, y, null, () => {
          collectedKeysNumber--;
        });
      }
      break;
    case 'trap':
      // Don't perform any action if the character is moving on a trap, but saves history before to avoid trap activation
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
        hasPerformedAction = true;
        removeConnectedBlocks(x, y, dx, dy);
      }
      break;
    case 'gong-trigger':
      if (!tileElement.triggered) {
        hasPerformedAction = true;
        tileElement.triggered = true;
        animateTileRemoval('gong', null, null, tileElement.orientation);
      }
      break;
  }

  return hasPerformedAction;
}

/**
 * Save the current level state to the action history
 */
function saveActionHistory() {
  let currentAction = {
    levelData: JSON.parse(JSON.stringify(levels[currentLevel].levelData)),
    stepsPerformed,
    collectedKeysNumber,
    characterX,
    characterY,
    characterDirection,
  };

  // Save the current level state to the action history if it's different from the last one
  if (
    actionHistory.length === 0 ||
    JSON.stringify(currentAction.levelData) !== JSON.stringify(actionHistory[actionHistory.length - 1].levelData)
  ) {
    actionHistory.push(currentAction);
  }
}

/**
 * Undo the last action performed
 */
function undoLastAction() {
  if (actionHistory.length > 0) {
    const previousLevelState = actionHistory.pop();
    // Restore the previous level state (level data, steps, keys, character position)
    levels[currentLevel].levelData = previousLevelState.levelData;
    // check is a tile add being removed state
    levels[currentLevel].levelData.forEach((tile) => {
      if (tile.isBeingRemoved) {
        tile.isBeingRemoved = false;
        tile.scale = 1;
      }
    });
    stepsPerformed = previousLevelState.stepsPerformed;
    collectedKeysNumber = previousLevelState.collectedKeysNumber;
    characterX = previousLevelState.characterX;
    characterY = previousLevelState.characterY;
    setCharacterDirection(previousLevelState.characterDirection);
  }
}
