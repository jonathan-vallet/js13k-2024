/**
 * Canvas animations functions to change tile frames and animate the level
 * @module 51-canvas-animations
 */

/**
 * Main animation loop
 * @param {number} timestamp - The current timestamp
 */
function animate(timestamp) {
  const deltaTime = timestamp - lastFrameTime;

  updateAnimations(deltaTime);

  if (isCharacterReturningToSpawn) {
    returnCharacterToSpawn();
  }

  refreshCanvas();
  lastFrameTime = timestamp;
  handleGamepadInput();

  requestAnimationFrame(animate);
}

/**
 * Update the animation frames of all animated tiles
 */
function updateAnimations(deltaTime) {
  let levelData = levels[currentLevel].levelData;
  levelData.forEach((tile) => {
    // Handle regular animation (frame changes)
    if (TILE_DATA[tile.tile].tiles.length > 1) {
      tile.elapsed = (tile.elapsed || 0) + deltaTime;
      const interval = ANIMATION_INTERVAL[tile.tile];
      if (tile.elapsed >= interval) {
        tile.animationFrame = (tile.animationFrame + 1) % TILE_DATA[tile.tile].tiles.length || 0;
        tile.elapsed = 0; // Reset elapsed time
      }
    }

    // Handle tile removal animation
    if (tile.isBeingRemoved) {
      tile.elapsed = (tile.elapsed || 0) + deltaTime;
      const duration = tile.removalDuration || DEFAULT_REMOVAL_DURATION;
      tile.scale = max(1 - tile.elapsed / duration, 0); // Reduce scale over time

      if (tile.scale <= 0) {
        removeTile(tile.tile, tile.x, tile.y);
        tile.isBeingRemoved = false;
        if (tile.removeCallback) {
          tile.removeCallback();
        }
      }
    }
  });

  // Handle character movement if no other animation is in progress
  if (!isCharacterMoving && !isCharacterReturningToSpawn && keyStack.length > 0) {
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

  if (movingTile) {
    animateTile(deltaTime);
  }
}

/**
 * Move the character to the specified position with animation
 * @param {number} deltaTime - The time elapsed since the last frame
 */
function playCharacterAnimation(deltaTime) {
  characterMoveElapsedTime += deltaTime;
  const progress = min(characterMoveElapsedTime / CHARACTER_MOVE_DURATION, 1);

  // Interpolate the character's position
  characterX = characterMoveStartX + (characterMoveTargetX - characterMoveStartX) * progress;
  characterY = characterMoveStartY + (characterMoveTargetY - characterMoveStartY) * progress;

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
    handlePostMoveEvents(characterMoveStartX, characterMoveStartY);
  }
}

function returnCharacterToSpawn() {
  // Handle character return to spawn animation
  const elapsedTime = performance.now() - characterReturnStartTime;
  const progress = min(elapsedTime / CHARACTER_RESPAWN_DURATION, 1);

  // First part: scale down at the current position
  if (progress < 0.5) {
    characterScale = 1 - progress * 2; // Scale down from 1 to 0
    characterX = characterRespawnStartX;
    characterY = characterRespawnStartY;
  } else {
    // Second part: scale up at the spawn position
    characterScale = (progress - 0.5) * 2; // Scale up from 0 to 1
    characterX = characterRespawnTargetX;
    characterY = characterRespawnTargetY;
    if (characterRespawnTargetX === characterInitialX && characterRespawnTargetY === characterInitialY) {
      setCharacterDirection(ORIENTATION_DOWN); // Reset the character direction
    }
  }

  // Terminer l'animation lorsque le progress atteint 1
  if (progress >= 1) {
    isCharacterReturningToSpawn = false;
    characterX = characterRespawnTargetX;
    characterY = characterRespawnTargetY;
    characterScale = 1;
  }
}

/**
 * Start the animation of a crate moving from one position to another
 * @param {number} deltaTime - The time elapsed since the last frame
 */
function animateTile(deltaTime) {
  tileMoveElapsedTime += deltaTime;

  const totalDistance = Math.abs(tileMoveStartX - tileMoveTargetX) + Math.abs(tileMoveStartY - tileMoveTargetY);
  let moveDuration = TILE_CELL_MOVE_DURATION * totalDistance;
  const progress = min(tileMoveElapsedTime / moveDuration, 1);

  if (movingTile.tile === 'boulder') {
    // Calculate the rotation based on progress and total distance
    const fullRotations = totalDistance; // Each cell results in a full rotation (4 steps)
    const rotationPerCell = 4; // 0, 1, 2, 3 for a full rotation
    const totalRotationSteps = fullRotations * rotationPerCell;

    // Calculate current rotation step based on progress
    const currentRotationStep = Math.floor(progress * totalRotationSteps) % rotationPerCell;

    // Set the orientation of the boulder based on the current rotation step
    movingTile.orientation = currentRotationStep; // 0, 1, 2, or 3
  }

  movingTile.x = tileMoveStartX + (tileMoveTargetX - tileMoveStartX) * progress;
  movingTile.y = tileMoveStartY + (tileMoveTargetY - tileMoveStartY) * progress;

  if (progress >= 1) {
    movingTile.x = tileMoveTargetX;
    movingTile.y = tileMoveTargetY;
    tileMoveElapsedTime = 0;

    // Specific logic for different tile types
    // When a crate reaches a hole or a trap, replace it with a filled hole
    if (movingTile.tile === 'crate') {
      checkCrateInHole(movingTile);
    }
    // When a boulder or crate reaches a switch trigger, invert the switches
    if (['crate', 'boulder'].includes(movingTile.tile)) {
      let switchTrigger = getTileAt(tileMoveTargetX, tileMoveTargetY, ['switch-trigger']);
      if (switchTrigger) {
        invertSwitches(switchTrigger.orientation);
      }
      // When a crate reaches a switch-on tile, remove it
      let switchOn = getTileAt(tileMoveTargetX, tileMoveTargetY, ['switch-on']);
      if (switchOn) {
        animateTileRemoval(movingTile.tile, tileMoveTargetX, tileMoveTargetY);
        playActionSound('fall');
      }
    }
    // When a boulder hit a gong trigger
    if (movingTile.tile === 'boulder') {
      const deltaX = tileMoveTargetX - tileMoveStartX;
      const deltaY = tileMoveTargetY - tileMoveStartY;

      // Calculate the next position that the boulder would move to if it continued in the same direction
      const nextX = movingTile.x + (deltaX !== 0 ? Math.sign(deltaX) : 0);
      const nextY = movingTile.y + (deltaY !== 0 ? Math.sign(deltaY) : 0);

      // Check if the next position contains a gong-trigger
      const nextTile = getTileAt(nextX, nextY);
      if (nextTile && nextTile.tile === 'gong-trigger' && !nextTile.triggered) {
        nextTile.triggered = true;
        animateTileRemoval('gong', null, null, nextTile.orientation);
        playActionSound('gong-trigger');
      }
    }
    movingTile = null; // Reset moving tile after the animation
  }
}

function checkCrateInHole(crate) {
  const holeTileAtPosition = getTileAt(crate.x, crate.y, ['hole', 'trap']);
  if (holeTileAtPosition) {
    removeTile(holeTileAtPosition.tile, crate.x, crate.y);
    removeTile('crate', crate.x, crate.y);
    addTile('hole-filled', crate.x, crate.y, { isUnder: true });
    playActionSound('fall');
  }
}
