/**
 * Canvas animations functions to change tile frames and animate the level
 * @module 51-canvas-animations
 */
let lastFrameTime = 0;

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
    playCharacterAnimation(deltaTime);
  }

  if (movingCrate) {
    animateCrate(deltaTime);
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

  // First part: scale down at the current position
  if (progress < 0.5) {
    characterScale = 1 - progress * 2; // Scale down from 1 to 0
    characterX = returnStartX;
    characterY = returnStartY;
  } else {
    // Second part: scale up at the spawn position
    characterScale = (progress - 0.5) * 2; // Scale up from 0 to 1
    characterX = initialX;
    characterY = initialY;
    setCharacterDirection(ORIENTATION_DOWN);
  }

  // Terminer l'animation lorsque le progress atteint 1
  if (progress >= 1) {
    isReturningToSpawn = false;
    characterX = initialX;
    characterY = initialY;
    characterScale = 1;

    // Retirer les spirales de levelData une fois l'animation terminée
    levelData = levelData.filter((tile) => tile.tile !== 'spiral');
  }
}

/**
 * Start the animation of a crate moving from one position to another
 * @param {number} deltaTime - The time elapsed since the last frame
 */
function animateCrate(deltaTime) {
  crateMoveElapsedTime += deltaTime;
  const progress = Math.min(crateMoveElapsedTime / CRATE_MOVE_DURATION, 1);
  movingCrate.x =
    crateMoveStartX + (crateMoveTargetX - crateMoveStartX) * progress;
  movingCrate.y =
    crateMoveStartY + (crateMoveTargetY - crateMoveStartY) * progress;

  if (progress >= 1) {
    movingCrate.x = crateMoveTargetX;
    movingCrate.y = crateMoveTargetY;
    crateMoveElapsedTime = 0;
    movingCrate = null;
  }
}
