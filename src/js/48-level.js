// Store the initial level data to allow for a hard reset
const initialLevelData = JSON.parse(JSON.stringify(levelData)); // Deep copy of the initial state

/**
 * Reset the entire level to its initial state
 */
function resetLevel() {
  // Restore the level data to its initial state
  levelData = JSON.parse(JSON.stringify(initialLevelData)); // Deep copy to avoid mutation

  // Reset the player's position
  playerX = initialX;
  playerY = initialY;

  // Reset the step counter
  stepsRemaining = 13;

  // Redraw the entire level, character, and step counter
  initLevel();
  drawCharacter();
  drawStepCounter();
}
