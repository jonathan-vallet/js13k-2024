document.addEventListener('keydown', (e) => {
  console.log('Key pressed:', e.key);
  const key = mapKeyToDirection(e.key);
  handleInput(key);
});

function handleInput(input) {
  if (currentScreen === 'game') {
    handleGameKeydown(input);
  }
  if (currentScreen === 'menu') {
    handleMenuKeydown(input);
  }
  if (currentScreen === 'characterSelection') {
    handleCharacterSelectionKeydown(input);
  }
  if (currentScreen === 'levelSelector') {
    handleLevelSelectionKeydown(input);
  }
  if (input === 'menu') {
    switchMode('menu');
  }
}

document.addEventListener('keyup', (event) => {
  const key = mapKeyToDirection(event.key);
  if (currentScreen === 'game') {
    handleGameKeyup(key);
  }
});

// Check for gamepad connection
window.addEventListener('gamepadconnected', (e) => {
  gamepadIndex = e.gamepad.index;
});

// Check for gamepad disconnection
window.addEventListener('gamepaddisconnected', (e) => {
  if (e.gamepad.index === gamepadIndex) {
    gamepadIndex = null;
  }
});

function handleGamepadInput() {
  const gamepads = navigator.getGamepads();
  if (!gamepads) {
    return;
  }

  const gamepad = gamepads[0]; // Utiliser la première manette connectée
  if (gamepad) {
    if (gamepad.buttons[12].pressed) handleInput('up');
    if (gamepad.buttons[13].pressed) handleInput('down');
    if (gamepad.buttons[14].pressed) handleInput('left');
    if (gamepad.buttons[15].pressed) handleInput('right');
    if (gamepad.buttons[0].pressed) handleInput('action'); // Bouton A
    if (gamepad.buttons[1].pressed) handleInput('undo'); // Bouton B
    if (gamepad.buttons[5].pressed) handleInput('undo');
    if (gamepad.buttons[2].pressed) handleInput('reset'); // Bouton X
    if (gamepad.buttons[4].pressed) handleInput('reset');
    if (gamepad.buttons[9].pressed) handleInput('menu');
  }
}

// Show selected tile in editor when hovering
canvas.addEventListener('mousemove', (e) => {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (currentScreen === 'editor') {
    currentEditorTile.x = Math.floor(mouseX / (TILE_SIZE * zoomFactor));
    currentEditorTile.y = Math.floor(mouseY / (TILE_SIZE * zoomFactor));

    // Draw tile preview at current mouse position
    drawEditorSelectedTile();

    // Add tile while dragging the mouse
    if (isMouseDown) {
      handleEditorClick(e);
    }
  }
});

canvas.addEventListener('mouseleave', (e) => {
  e.preventDefault();
  if (currentScreen === 'editor') {
    currentEditorTile.x = -1;
    currentEditorTile.y = -1;
    drawEditorSelectedTile();
  }
});

canvas.addEventListener('mousewheel', (e) => {
  e.preventDefault();
  if (currentScreen === 'editor') {
    // Changes tile orientation
    const delta = max(-1, min(1, e.wheelDelta || -e.detail));

    $orientationSelect.value = (parseInt($orientationSelect.value) + delta + 4) % 4;
    drawEditorSelectedTile();
  }
});

canvas.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  if (currentScreen === 'editor') {
    handleEditorClick(e);
  }
});

window.addEventListener('mouseup', (e) => {
  isMouseDown = false;
});
