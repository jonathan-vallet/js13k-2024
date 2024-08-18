// Store the initial level data to allow for a hard reset
const initialLevelData = JSON.parse(JSON.stringify(levelData)); // Deep copy of the initial state

/**
 * Reset the entire level to its initial state
 */
function resetLevel() {
  // Restore the level data to its initial state
  levelData = JSON.parse(JSON.stringify(initialLevelData)); // Deep copy to avoid mutation

  // Reset the animation state of each tile
  levelData.forEach((tile) => {
    if (GAME_SPRITES[tile.tile].tiles.length > 1) {
      tile.animationFrame = 0;
      tile.elapsed = 0;
    }
    tile.isBeingRemoved = false;
    tile.scale = 1;
  });

  // Reset the character's position
  characterX = initialX;
  characterY = initialY;
  characterScale = 1;

  // Reset the step counter
  stepsPerformed = MAX_STEPS_ALLOWED0;

  // Redraw the entire level, character, and step counter
}
