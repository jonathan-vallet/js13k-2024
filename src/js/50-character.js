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

let isReturningToSpawn = false; // Flag to track if the character is returning to spawn
let spawnReturnTimeout; // Timeout to return the character to spawn after a delay
let characterReturnStartTime = 0; // Start time for the character return animation
const CHARACTER_RETURN_DURATION = 400; // Duration of the character return animation in ms
let returnStartX, returnStartY; // Start position for the character return

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

  const tileAtTarget = getTileAt(x, y);
  const tileElement = levelData.find(
    (element) => element.x === x && element.y === y,
  );

  // Block movement if the tile is being removed
  if (tileElement && tileElement.isBeingRemoved) {
    return false;
  }

  let hasPerformedAction = tryPerformAction(
    x,
    y,
    dx,
    dy,
    tileAtTarget,
    tileElement,
  );

  if (hasPerformedAction) {
    playActionSound(tileAtTarget);
  }

  // If the tile is a not a free space, return false
  if (![null, 'arrow', 'key', 'key-holder', 'flag'].includes(tileAtTarget)) {
    if (hasPerformedAction) {
      ++stepsPerformed;
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
    }

    stepsPerformed = Math.min(stepsPerformed + 1, MAX_STEPS_ALLOWED);

    // Check if the character has reached 13 steps
    if (stepsPerformed >= MAX_STEPS_ALLOWED && !spawnReturnTimeout) {
      spawnReturnTimeout = setTimeout(() => {
        isReturningToSpawn = true;
        // After the delay, start the return to spawn animation
        returnStartX = characterX;
        returnStartY = characterY;
        characterReturnStartTime = performance.now();
        stepsPerformed = 0; // Reset steps
        spawnReturnTimeout = null;
      }, RESPAWN_RESET_DELAY);
    } else {
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
