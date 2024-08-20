function startLevel(levelIndex) {
  // Saves initial state of the level
  currentLevel = levelIndex;
  levels[currentLevel].initialData = JSON.parse(JSON.stringify(levels[currentLevel].levelData));
  resetCharacter(); // Reset the character position and direction
}

/**
 * Reset the entire level to its initial state
 */
function resetLevel() {
  // Restore the level data to its initial state
  levels[currentLevel].levelData = JSON.parse(JSON.stringify(levels[currentLevel].initialData));

  resetCharacter(); // Reset the character position and direction

  // Reset the step counter and movement history
  stepsPerformed = 0;
  movementHistory = [];
}

/**
 * Reset the character to its initial position and direction
 */
function resetCharacter() {
  // Reset the character's position
  characterInitialX = levels[currentLevel].characterInitialX;
  characterInitialY = levels[currentLevel].characterInitialY;
  characterX = characterInitialX;
  characterY = characterInitialY;
  setCharacterDirection(characterInitialOrientation); // Reset the character direction
  characterScale = 1;
}

/**
 * Check if a given position is within the bounds of the level
 * @param {number} x - The x-coordinate to check
 * @param {number} y - The y-coordinate to check
 * @returns {boolean} - Whether the position is within the level bounds
 */
function isInLevelBounds(x, y) {
  return x >= 1 && x < LEVEL_WIDTH - 1 && y >= 1 && y < LEVEL_HEIGHT - 1;
}
