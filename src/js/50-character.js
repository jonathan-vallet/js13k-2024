/**
 * Character
 * This file contains the logic for moving the character on the grid and performing actions
 * @module 50-character
 */

// Initialize the character on the grid at the start of the game
let characterX = 9;
let characterY = 7;
let characterScale = 1;
let characterDirection = ORIENTATION_DOWN; // Track the current direction
let initialX = characterX; // Store the initial position for reset
let initialY = characterY;
let isCharacterMoving = false;
let characterMoveStartX = characterX;
let characterMoveStartY = characterY;
let characterMoveTargetX = characterX;
let characterMoveTargetY = characterY;
let characterMoveFrame = 0;
const CHARACTER_MOVE_DURATION = 300;
let characterMoveElapsedTime = 0;

// Initialize the step counter (13 steps)
let stepsRemaining = MAX_STEPS_ALLOWED;

/**
 * Draw the character sprite on the canvas
 */
function drawCharacter() {
  const characterTile = GAME_SPRITES['characters'].tiles[characterMoveFrame]; // Use the current frame
  const characterColors = DEFAULT_TILE_COLORS['character'];

  drawTile(characterTile, characterColors, characterX, characterY, {
    scale: characterScale,
    flipHorizontally: characterDirection === ORIENTATION_RIGHT,
  });
}

/**
 * Check if the character can move to the specified position
 * @param {number} x - The x-coordinate
 * @param {number} y - The y-coordinate
 * @param {number} dx - The x-direction of movement
 * @param {number} dy - The y-direction of movement
 * @returns {boolean} - True if the character can move to this position, false otherwise
 */
function canMoveTo(x, y, dx = 0, dy = 0) {
  // Check grid boundaries (excluding the border)
  if (x < 1 || x >= LEVEL_WIDTH - 1 || y < 1 || y >= LEVEL_HEIGHT - 1) {
    playActionSound('wall');
    return false;
  }

  const tileAtTarget = getTileAt(x, y);
  const tileElement = levelData.find(
    (element) => element.x === x && element.y === y,
  );

  // Block movement if the tile is being removed
  if (tileElement && tileElement.isBeingRemoved) {
    return false;
  }

  let hasPerformedAction = false;
  switch (tileAtTarget) {
    case 'crate':
      if (moveCrate(x, y, dx, dy)) {
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

  if (hasPerformedAction) {
    playActionSound(tileAtTarget);
  }

  // If the tile is a not a free space, return false
  if (![null, 'arrow', 'key', 'key-holder', 'flag'].includes(tileAtTarget)) {
    if (hasPerformedAction) {
      --stepsRemaining;
    } else {
      playActionSound('wall');
    }
    return false;
  }

  return true;
}

/**
 * Move the character
 * @param {number} dx - The x-direction of movement
 * @param {number} dy - The y-direction of movement
 */
function moveCharacter(dx, dy, direction) {
  if (isReturningToSpawn || isCharacterMoving) {
    return; // Prevent movement while returning to spawn
  }

  const newX = characterX + dx;
  const newY = characterY + dy;
  setCharacterDirection(direction);

  // Check if the character can move to the new position
  if (canMoveTo(newX, newY, dx, dy)) {
    // Start the movement animation
    isCharacterMoving = true;
    characterMoveStartX = characterX;
    characterMoveStartY = characterY;
    characterMoveTargetX = newX;
    characterMoveTargetY = newY;
    characterMoveElapsedTime = 0;

    stepsRemaining--; // Decrement the step counter on successful move

    // Check if the character has run out of steps
    if (stepsRemaining <= 0) {
      isReturningToSpawn = true; // Start the return to spawn animation
      returnStartX = characterX;
      returnStartY = characterY;
      characterReturnStartTime = performance.now();
      stepsRemaining = MAX_STEPS_ALLOWED;
    }
  }
}

function setCharacterDirection(direction) {
  characterDirection = direction;
  characterMoveFrame = getMoveFrameFromDirection(characterDirection);
}

function getMoveFrameFromDirection(direction) {
  switch (direction) {
    case ORIENTATION_UP:
      return 2;
    case ORIENTATION_RIGHT:
    case ORIENTATION_LEFT:
      return 1;
    case ORIENTATION_DOWN:
      return 0;
  }
}
