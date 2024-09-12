document.addEventListener('keydown', (e) => {
  const key = mapKeyToDirection(e.key);
  handleInput(key);
});

document.addEventListener('keyup', (event) => {
  const key = mapKeyToDirection(event.key);
  handleRelease(key);
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

function handleRelease(input) {
  if (currentScreen === 'game') {
    handleGameKeyup(input);
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
