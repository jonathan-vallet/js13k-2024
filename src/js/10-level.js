function startLevel(levelIndex) {
  // Saves initial state of the level
  currentLevel = levelIndex;
  drawLevelBackground('sand', 'rock');
  levels[currentLevel].initialData = JSON.parse(JSON.stringify(levels[currentLevel].levelData));
  stepsPerformed = 0;
  collectedKeysNumber = 0;
  actionHistory = [];
  resetCharacter(); // Reset the character position and direction
}

/**
 * Reset the entire level to its initial state
 */
function resetLevel() {
  // Restore the level data to its initial state
  if (levels[currentLevel]?.initialData) {
    levels[currentLevel].levelData = JSON.parse(JSON.stringify(levels[currentLevel].initialData));
  }
  startLevel(currentLevel); // Restart the level
}

function endLevel() {
  keyStack = [];
  let completedLevelList = getLocalStorage('completedLevelList') || [];
  if (!completedLevelList.includes(currentLevel)) {
    completedLevelList.push(currentLevel);
    setLocalStorage('completedLevelList', JSON.stringify(completedLevelList));
  }
  let nextLevel = (currentLevel + 1) % totalLevelNumber; // If the current level is the last one, go back to the first one
  setLocalStorage('currentLevel', nextLevel);
  levelSelectionIndex = nextLevel;
  switchMode('levelSelector');
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
  setCharacterDirection(ORIENTATION_DOWN); // Reset the character direction
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
