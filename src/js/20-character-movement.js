// Handle keyboard input for character movement
function handleGameKeydown(key) {
  if (key && !keyStack.includes(key) && ['up', 'down', 'left', 'right'].includes(key)) {
    keyStack.push(key);
  }
}

function handleGameKeyup(key) {
  if (key) {
    const index = keyStack.indexOf(key);
    if (index !== -1) {
      keyStack.splice(index, 1); // Remove the key from the stack
    }
  }

  // R to reset the level
  if (key === 'reset') {
    resetLevel();
  }
  // E to undo the last action
  if (key === 'undo') {
    undoLastAction();
  }

  hasPlayedWallSoundDuringKeyHold = false;
}

// Map keys to movement directions
function mapKeyToDirection(key) {
  switch (key) {
    case 'ArrowUp':
    case 'z':
    case 'w':
      return 'up';
    case 'ArrowDown':
    case 's':
      return 'down';
    case 'ArrowLeft':
    case 'q':
    case 'a':
      return 'left';
    case 'ArrowRight':
    case 'd':
      return 'right';
    case 'Enter':
      return 'action';
    case ' ': // for steam controller
    case 'Control': // for steam controller
    case 'e':
      return 'undo';
    case 'Alt':
    case 'r':
      return 'reset';
    case 'Escape':
      return 'menu';
    default:
      return key;
  }
}
