function refreshUI() {
  drawUI();
}

/**
 * Draw the UI (steps, keys, controls) on the UI canvas
 */
function drawUI() {
  uiCtx.fillStyle = COLOR_TEXT;
  uiCtx.fillRect(0, 0, uiCanvas.width, uiCanvas.height);

  let soundTileName = isSoundActive ? 'sound-on' : 'sound-off';
  const soundTile = TILE_DATA[soundTileName].tiles[0];
  const soundColors = TILE_DATA[soundTileName].colors;
  drawTile(soundTile, soundColors, 18.8, 0.1, { context: uiCtx });
  let title = '';
  let scale = 1.5;
  if (currentScreen === 'menu') {
    title = '13 STEPS TO ESCAPE';
  }
  if (currentScreen === 'characterSelection') {
    title = 'CHARACTER CUSTOMIZATION';
  }
  if (currentScreen === 'game') {
    title = 'STEPS';
    scale = 1;
  }
  if (currentScreen === 'editor') {
    title = 'TILE:';
    scale = 1;
  }
  if (currentScreen === 'levelSelector') {
    title = 'LEVEL SELECTION';
  }

  writeText({
    ctx: uiCtx,
    x: 10,
    y: scale === 1 ? 6 : 3.33,
    text: title,
    scale,
  });

  if (currentScreen === 'editor') {
    writeText({
      ctx: uiCtx,
      x: 92,
      y: 6,
      text: 'ORIENTATION:',
    });
  }

  if (currentScreen === 'game') {
    // Draw steps remaining
    let shakeX = 0;
    let shakeY = 0;
    if (stepsPerformed >= 10) {
      const intensity = stepsPerformed - 9;
      shakeX = getShakeOffset(intensity);
      shakeY = getShakeOffset(intensity);
    }

    // Draw steps remaining
    writeText({
      ctx: uiCtx,
      x: 25 + shakeX,
      y: 3 + shakeY,
      text: `${13 - stepsPerformed}`,
      color: getStepColor(stepsPerformed),
      scale: 1.5,
    });

    // Draw the key icon and count
    const keyTile = TILE_DATA['key'].tiles[0];
    const keyColors = TILE_DATA['key'].colors;
    drawTile(keyTile, keyColors, 4.5, 0.2, { context: uiCtx });

    // Draw current level
    writeText({
      ctx: uiCtx,
      x: 120,
      y: 6,
      text: `LEVEL: ${currentLevel}`,
    });

    writeText({
      ctx: uiCtx,
      x: 90,
      y: 6,
      text: `x${collectedKeysNumber}`,
    });

    writeText({
      ctx: uiCtx,
      x: 220,
      y: 3,
      text: `E: UNDO`,
    });
    writeText({
      ctx: uiCtx,
      x: 220,
      y: 10,
      text: `R: RESET`,
    });
  }
}

function getShakeOffset(intensity) {
  const maxShake = intensity * 0.5; // L'intensité détermine l'amplitude du shake
  return Math.random() * maxShake - maxShake / 2; // Retourne une valeur aléatoire entre -maxShake/2 et +maxShake/2
}

function getStepColor(stepsPerformed) {
  if (stepsPerformed < 11) {
    return 'rgb(255, 255, 255)'; // White
  } else if (stepsPerformed < 12) {
    return 'rgb(255, 255, 0)'; // Yellow
  } else if (stepsPerformed < 13) {
    return 'rgb(255, 165, 0)'; // Orange
  } else {
    return 'rgb(255, 0, 0)'; // Red
  }
}

function toggleSound() {
  isSoundActive = !isSoundActive;
  setLocalStorage('isSoundActive', isSoundActive);
  if (isSoundActive) {
    playMusicControl();
  } else {
    stopMusic();
  }
}

uiCanvas.addEventListener('click', function (event) {
  // if click on sound icon, toggle sound
  if (event.offsetX > 18 * TILE_SIZE * zoomFactor) {
    toggleSound();
  }
});
