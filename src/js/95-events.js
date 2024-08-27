addEventListener('keydown', (e) => {
  const key = mapKeyToDirection(e.key);
  if (currentScreen === 'game') {
    handleGameKeydown(key);
  }
  if (currentScreen === 'menu') {
    handleMenuKeydown(key, e);
  }
  // Escape key to go back to menu
  if (e.key === 'Escape') {
    switchMode('menu');
  }
});

addEventListener('keyup', (event) => {
  const key = mapKeyToDirection(event.key);
  if (currentScreen === 'game') {
    handleGameKeyup(key);
  }
});

// Show selected tile in editor when hovering
canvas.addEventListener('mousemove', (e) => {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (currentScreen === 'menu') {
    menuZones.forEach((zone, index) => {
      if (mouseX >= zone.x && mouseX <= zone.x + zone.width && mouseY >= zone.y && mouseY <= zone.y + zone.height) {
        if (!zone.isDisabled) {
          currentMenuIndex = index; // Highlight the option being hovered
        }
      }
    });
  }

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

canvas.addEventListener('click', (e) => {
  if (currentScreen === 'menu') {
    handleMenuClick(e);
  }
});

window.addEventListener('mouseup', (e) => {
  isMouseDown = false;
});
