/**
 * Character
 * This file contains the logic for moving the character on the grid and performing actions
 * @module 50-character
 */

// Initialize the character on the grid at the start of the game
let initialX = 9;
let initialY = 7;
let characterScale = 1;
let characterDirection = ORIENTATION_DOWN; // Track the current direction
let characterX = initialX;
let characterY = initialY;
let isCharacterMoving = false;
let characterMoveStartX = characterX;
let characterMoveStartY = characterY;
let characterMoveTargetX = characterX;
let characterMoveTargetY = characterY;
let characterMoveFrame = 0;
const CHARACTER_MOVE_DURATION = 300;
let characterMoveElapsedTime = 0;

let isReturningToSpawn = false; // Flag to track if the character is returning to spawn
let characterReturnStartTime = 0; // Start time for the character return animation
const CHARACTER_RETURN_DURATION = 400; // Duration of the character return animation in ms
let respawnStartX, respawnStartY; // Start position for the character respawn
let respawnTargetX, respawnTargetY; // Target position for the character respawn

// Initialize the step counter
let stepsPerformed = 0;

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
  if (movingCrate || isCharacterMoving || isReturningToSpawn) {
    return false; // Cannot move while the character or crate is moving
  }

  // Check grid boundaries (excluding the border)
  if (!isInBounds(x, y)) {
    playActionSound('wall');
    return false;
  }

  const tileElement = getTileAt(x, y);
  const tileAtTarget = tileElement?.tile || null;

  // Block movement if the tile is being removed
  if (tileElement && tileElement.isBeingRemoved) {
    return false;
  }

  let hasPerformedAction = tryPerformAction(x, y, dx, dy, tileElement);

  if (hasPerformedAction) {
    playActionSound(tileAtTarget);
  }

  // If the tile is a not a free space, return false
  if (
    ![
      null,
      'arrow',
      'key',
      'key-holder',
      'flag',
      'trap',
      'hole',
      'hole-filled',
      'spawn',
      'spawn-current',
    ].includes(tileAtTarget)
  ) {
    if (hasPerformedAction) {
      ++stepsPerformed;
      handlePostMoveEvents(characterX, characterY);
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

/**
 * Move the character
 * @param {number} dx - The x-direction of movement
 * @param {number} dy - The y-direction of movement
 */
function moveCharacter(dx, dy, direction) {
  if (isReturningToSpawn || isCharacterMoving) {
    return; // Prevent movement while returning to spawn or if already moving
  }

  const newX = characterX + dx;
  const newY = characterY + dy;
  let previousDirection = characterDirection;
  setCharacterDirection(direction);

  // Check if the character can move to the new position
  if (canMoveTo(newX, newY, dx, dy)) {
    // Start the movement animation
    if (stepsPerformed < MAX_STEPS_ALLOWED) {
      isCharacterMoving = true;
      characterMoveStartX = characterX;
      characterMoveStartY = characterY;
      characterMoveTargetX = newX;
      characterMoveTargetY = newY;
      characterMoveElapsedTime = 0;
      movementHistory.push({
        x: characterX,
        y: characterY,
        orientation: previousDirection,
      });
    }

    stepsPerformed = Math.min(stepsPerformed + 1, MAX_STEPS_ALLOWED);
  }
}

function respawnCharacter(respawnX = null, respawnY = null) {
  isReturningToSpawn = true;
  // After the delay, start the return to spawn animation
  respawnStartX = characterX;
  respawnStartY = characterY;
  respawnTargetX = respawnX || initialX;
  respawnTargetY = respawnY || initialY;
  characterReturnStartTime = performance.now();
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

/**
 * Handle action that triggers when the character moves to a new position
 */
function handlePostMoveEvents(lastX, lastY) {
  const tileAtPreviousPosition = getTileAt(lastX, lastY);
  const tileAtCurrentPosition = getTileAt(characterX, characterY);

  switch (tileAtPreviousPosition?.tile) {
    case 'trap':
      // Transformer le piège en trou après que le joueur a quitté la case
      tileAtPreviousPosition.tile = 'hole';
      break;
  }

  switch (tileAtCurrentPosition?.tile) {
    case 'hole':
      respawnCharacter(
        movementHistory[movementHistory.length - 1].x,
        movementHistory[movementHistory.length - 1].y,
      );
      --stepsPerformed;
      break;
  }

  if (stepsPerformed >= MAX_STEPS_ALLOWED) {
    respawnCharacter();
    stepsPerformed = 0; // Reset steps
  }
}
