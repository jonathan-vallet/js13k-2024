// Initialize the character on the grid at the start of the game
let playerX = 9;
let playerY = 7;
const initialX = playerX; // Store the initial position for reset
const initialY = playerY;

// Initialize the step counter (13 steps)
let stepsRemaining = 13;

/**
 * Draw the character sprite on the canvas
 */
function drawCharacter() {
  const characterTile = GAME_SPRITES['characters'].tiles[0];
  const characterColors = DEFAULT_TILE_COLORS['character'];
  drawTile(characterTile, characterColors, playerX, playerY);
}

/**
 * Draw the step counter in the top-left corner of the canvas
 */
function drawStepCounter() {
  ctx.font = '20px Arial';
  ctx.fillStyle = 'white';
  ctx.clearRect(0, 0, 150, 30); // Clear the area for the counter
  ctx.fillText(`Steps: ${stepsRemaining}`, 10, 25);
}

/**
 * Check if the player can move to the specified position
 * @param {number} x - The x-coordinate
 * @param {number} y - The y-coordinate
 * @param {number} dx - The x-direction of movement
 * @param {number} dy - The y-direction of movement
 * @returns {boolean} - True if the player can move to this position, false otherwise
 */
function canMoveTo(x, y, dx = 0, dy = 0) {
  // Check grid boundaries (excluding the border)
  if (x < 1 || x >= LEVEL_WIDTH - 1 || y < 1 || y >= LEVEL_HEIGHT - 1) {
    return false;
  }

  const tileAtTarget = getTileAt(x, y);

  // If the tile is a crate, try to move it
  if (tileAtTarget === 'crate') {
    if (moveCrate(x, y, dx, dy)) {
      stepsRemaining--; // Decrement steps on successful action
      initLevel();
      drawCharacter();
      drawStepCounter();
      return false;
    }
  }

  // If the player moves onto a gong-trigger, remove the gong
  if (tileAtTarget === 'gong-trigger') {
    removeTile('gong'); // Remove the gong from the level
    stepsRemaining--; // Decrement steps on successful action
    initLevel();
    drawCharacter();
    drawStepCounter();
    return false;
  }

  // If the tile is a block, rock, or lock, block movement
  if (![null, 'arrow', 'key'].includes(tileAtTarget)) {
    return false;
  }

  return true;
}

/**
 * Move the character
 * @param {number} dx - The x-direction of movement
 * @param {number} dy - The y-direction of movement
 */
function moveCharacter(dx, dy) {
  const newX = playerX + dx;
  const newY = playerY + dy;

  // Check if the player can move to the new position
  if (canMoveTo(newX, newY, dx, dy)) {
    // Update the position
    playerX = newX;
    playerY = newY;
    stepsRemaining--; // Decrement the step counter on successful move

    // Redraw the level, character, and step counter
    initLevel();
    drawCharacter();
    drawStepCounter();

    // Check if the player has run out of steps
    if (stepsRemaining <= 0) {
      resetPlayer(); // Reset the player and step counter
    }
  } else {
    // Otherwise, log a message about the block
    console.log('Movement blocked by:', getTileAt(newX, newY));
  }
}

/**
 * Reset the player position and step counter
 */
function resetPlayer() {
  playerX = initialX;
  playerY = initialY;
  stepsRemaining = 13;
  console.log('Player reset after 13 steps');

  // Redraw the level, character, and step counter
  initLevel();
  drawCharacter();
  drawStepCounter();
}

// Handle keyboard input for character movement
function handleKeyPress(event) {
  switch (event.key) {
    case 'ArrowUp':
    case 'z': // Z for ZQSD
    case 'w': // W for WASD
      moveCharacter(0, -1); // Move up
      break;
    case 'ArrowDown':
    case 's': // S for ZQSD and WASD
      moveCharacter(0, 1); // Move down
      break;
    case 'ArrowLeft':
    case 'q': // Q for ZQSD
    case 'a': // A for WASD
      moveCharacter(-1, 0); // Move left
      break;
    case 'ArrowRight':
    case 'd': // D for ZQSD and WASD
      moveCharacter(1, 0); // Move right
      break;
    case 'r': // R for Hard Reset
      resetLevel(); // Perform a hard reset of the level
      break;
  }
}

// Add an event listener to detect key presses
window.addEventListener('keydown', handleKeyPress);

// Initialize the character on the grid at the start
drawCharacter();
drawStepCounter();
