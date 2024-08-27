/**
 * Character
 * This file contains the logic for moving the character on the grid and performing actions
 * @module 50-character
 */

// Initialize the character on the grid at the start of the game
let characterScale;
let characterDirection; // Track the current direction
let characterInitialX;
let characterInitialY;
let characterX;
let characterY;
let isCharacterMoving;
let characterMoveStartX = characterX;
let characterMoveStartY = characterY;
let characterMoveTargetX = characterX;
let characterMoveTargetY = characterY;
let characterMoveFrame;
let characterMoveElapsedTime;

let isCharacterReturningToSpawn; // Flag to track if the character is returning to spawn
let characterReturnStartTime; // Start time for the character return animation
let characterRespawnStartX, characterRespawnStartY; // Start position for the character respawn
let characterRespawnTargetX, characterRespawnTargetY; // Target position for the character respawn

// Initialize the step counter
let stepsPerformed = 0;

/**
 * Draw the character sprite on the canvas
 */
function drawCharacter() {
  const characterTile = TILE_DATA['characters'].tiles[characterMoveFrame]; // Use the current frame
  const characterColors = TILE_DATA['characters'].colors;

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
  if (movingTile || isCharacterMoving || isCharacterReturningToSpawn) {
    return false; // Cannot move while the character or crate is moving
  }

  // Check grid boundaries (excluding the border)
  if (!isInLevelBounds(x, y)) {
    playActionSound('wall');
    return false;
  }

  const tileElement = getTileAt(x, y);
  const tileAtTarget = tileElement?.tile || null;

  // Block movement if the tile is being removed
  if (tileElement && tileElement.isBeingRemoved) {
    return false;
  }

  let levelStateBeforeAction = encodeLevel(levels[currentLevel].levelData);
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
      'spikes',
      'hole-filled',
      'spawn',
      'spawn-current',
      'switch-trigger',
      'switch-off',
    ].includes(tileAtTarget)
  ) {
    if (hasPerformedAction) {
      ++stepsPerformed;
      hasPlayedWallSoundDuringKeyHold = true; // Avoid playing the wall sound after an action is performed on same key hold
      handlePostMoveEvents(characterX, characterY, hasPerformedAction);
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
  if (isCharacterReturningToSpawn || isCharacterMoving || movingTile) {
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

    stepsPerformed = min(stepsPerformed + 1, MAX_STEPS_ALLOWED);
  }
}

function respawnCharacter(respawnX = null, respawnY = null) {
  isCharacterReturningToSpawn = true;
  // After the delay, start the return to spawn animation
  characterRespawnStartX = characterX;
  characterRespawnStartY = characterY;
  characterRespawnTargetX = respawnX || characterInitialX;
  characterRespawnTargetY = respawnY || characterInitialY;
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
function handlePostMoveEvents(lastX, lastY, hasPerformedAction) {
  const tileAtPreviousPosition = getTileAt(lastX, lastY, ['trap', 'switch-trigger']);
  const tileAtCurrentPosition = getTileAt(characterX, characterY);

  switch (tileAtPreviousPosition?.tile) {
    case 'trap':
      // Transform the trap into a hole when the character moves away
      if (!hasPerformedAction && tileAtCurrentPosition?.tile !== 'hole') {
        playActionSound('trap');
        tileAtPreviousPosition.tile = 'hole';
      }
      break;
    case 'switch-trigger':
      invertSwitches();
      break;
  }

  switch (tileAtCurrentPosition?.tile) {
    case 'hole':
    case 'spikes':
      respawnCharacter(lastX, lastY);
      --stepsPerformed;
      break;
    case 'flag':
      setLocalStorage('currentLevel', currentLevel + 1);
      startLevel(currentLevel + 1);
      return false; // Prevent further movement
      break;
    case 'spawn-current':
      stepsPerformed = 0;
      break;
    case 'spawn':
      // Sets previous current spawn point back to spawn
      getTileAt(characterInitialX, characterInitialY).tile = 'spawn';

      // Sets as current spawn point
      tileAtCurrentPosition.tile = 'spawn-current';
      tileAtCurrentPosition.animationFrame = 0;
      tileAtCurrentPosition.elapsed = 0;
      // reset animation interval
      characterInitialX = characterX;
      characterInitialY = characterY;
      stepsPerformed = 0;
      break;
    case 'switch-trigger':
      invertSwitches();
      break;
    case 'key':
      // Pick up the key
      removeTile('key', characterX, characterY);
      playActionSound('key');
      ++collectedKeysNumber;
      break;
  }

  if (stepsPerformed >= MAX_STEPS_ALLOWED) {
    respawnCharacter();
    setTimeout(() => {
      stepsPerformed = 0; // Reset steps after returning to spawn
    }, CHARACTER_RESPAWN_DURATION);
  }
}
