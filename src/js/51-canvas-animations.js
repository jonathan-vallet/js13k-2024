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
}
