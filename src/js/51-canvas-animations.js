/**
 * Canvas animations functions to change tile frames and animate the level
 * @module 51-canvas-animations
 */
let lastFrameTime = 0;
let isReturningToSpawn = false; // Flag to track if the character is returning to spawn
let characterReturnStartTime = 0; // Start time for the character return animation
const CHARACTER_RETURN_DURATION = 250; // Duration of the character return animation in ms
let returnStartX, returnStartY; // Start position for the character return

/**
 * Main animation loop
 * @param {number} timestamp - The current timestamp
 */
function animate(timestamp) {
  const deltaTime = timestamp - lastFrameTime;

  updateAnimations(deltaTime);

  if (isReturningToSpawn) {
    returnCharacterToSpawn();
  }

  refreshCanvas();
  lastFrameTime = timestamp;

  requestAnimationFrame(animate);
}

/**
 * Update the animation frames of all animated tiles
 */
function updateAnimations(deltaTime) {
  levelData.forEach((tile) => {
    // Handle regular animation (frame changes)
    if (GAME_SPRITES[tile.tile].tiles.length > 1) {
      tile.elapsed = (tile.elapsed || 0) + deltaTime;
      const interval = tile.animationInterval || DEFAULT_ANIMATION_INTERVAL;
      if (tile.elapsed >= interval) {
        tile.animationFrame =
          (tile.animationFrame + 1) % GAME_SPRITES[tile.tile].tiles.length;
        tile.elapsed = 0; // Reset elapsed time
      }
    }

    // Handle tile removal animation
    if (tile.isBeingRemoved) {
      tile.elapsed = (tile.elapsed || 0) + deltaTime;
      const duration = tile.removalDuration || DEFAULT_REMOVAL_DURATION;
      tile.scale = Math.max(1 - tile.elapsed / duration, 0); // Reduce scale over time

      if (tile.scale <= 0) {
        removeTile(tile.tile, tile.x, tile.y);
        if (tile.removeCallback) {
          tile.removeCallback();
        }
      }
    }
  });

  // Handle character movement if no other animation is in progress
  if (!isCharacterMoving && !isReturningToSpawn && keyStack.length > 0) {
    const direction = keyStack[keyStack.length - 1]; // Get the most recent key pressed

    switch (direction) {
      case 'up':
        moveCharacter(0, -1, ORIENTATION_UP);
        break;
      case 'down':
        moveCharacter(0, 1, ORIENTATION_DOWN);
        break;
      case 'left':
        moveCharacter(-1, 0, ORIENTATION_LEFT);
        break;
      case 'right':
        moveCharacter(1, 0, ORIENTATION_RIGHT);
        break;
    }
  }

  // Handle character movement animation
  if (isCharacterMoving) {
    console.log('Character is moving');
    playCharacterAnimation(deltaTime);
  }
}

/**
 * Move the character to the specified position with animation
 * @param {number} deltaTime - The time elapsed since the last frame
 */
function playCharacterAnimation(deltaTime) {
  characterMoveElapsedTime += deltaTime;
  const progress = Math.min(
    characterMoveElapsedTime / CHARACTER_MOVE_DURATION,
    1,
  );

  // Interpolate the character's position
  characterX =
    characterMoveStartX +
    (characterMoveTargetX - characterMoveStartX) * progress;
  characterY =
    characterMoveStartY +
    (characterMoveTargetY - characterMoveStartY) * progress;

  // Determine the character's movement direction
  let characterFrameDirection = getMoveFrameFromDirection(characterDirection);

  // Determine which frame to show based on the progress
  const phase = Math.floor(progress * 3); // Divide the animation into 4 phases (0 to 3)
  switch (phase) {
    case 0:
      characterMoveFrame = characterFrameDirection + 3; // Second frame (3, 4, 5)
      break;
    case 1:
      characterMoveFrame = characterFrameDirection; // First frame (0, 1, 2 depending on direction)
      break;
    case 2:
      characterMoveFrame = characterFrameDirection + 6; // Final frame (6, 7, 8)
      break;
  }

  if (progress >= 1) {
    isCharacterMoving = false;
    characterX = characterMoveTargetX;
    characterY = characterMoveTargetY;
    characterMoveElapsedTime = 0;
    characterMoveFrame = characterFrameDirection; // Reset to the default frame
  }
}

function returnCharacterToSpawn() {
  // Handle character return to spawn animation
  const elapsedTime = performance.now() - characterReturnStartTime;
  const progress = Math.min(elapsedTime / CHARACTER_RETURN_DURATION, 1);

  // Calculate the character's current position based on progress
  characterX = returnStartX + (initialX - returnStartX) * progress;
  characterY = returnStartY + (initialY - returnStartY) * progress;

  // Calculate the scale: scale down during the first half, then scale up
  const CHARACTER_SCALE_REDUCTION = 0.4;
  characterScale =
    progress < 0.5
      ? 1 - progress * 2 * (1 - CHARACTER_SCALE_REDUCTION)
      : 1 - (1 - progress) * 2 * (1 - CHARACTER_SCALE_REDUCTION);
  // End the animation when the progress reaches 1
  if (progress >= 1) {
    isReturningToSpawn = false;
    characterX = initialX;
    characterY = initialY;
  }
}
