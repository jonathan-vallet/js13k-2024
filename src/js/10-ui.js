function refreshUI() {
  drawUI();
}

/**
 * Draw the UI (steps, keys, controls) on the UI canvas
 */
function drawUI() {
  uiCtx.fillStyle = '#333';
  uiCtx.fillRect(0, 0, uiCanvas.width, uiCanvas.height);

  // Draw steps remaining
  textManager.text({
    ctx: uiCtx,
    x: 10,
    y: 7,
    text: `STEPS:`,
    color: 'rgb(255,255,255)',
  });

  let shakeX = 0;
  let shakeY = 0;
  if (stepsPerformed >= 10) {
    const intensity = stepsPerformed - 9;
    shakeX = getShakeOffset(intensity);
    shakeY = getShakeOffset(intensity);
  }

  // Draw steps remaining
  textManager.text({
    ctx: uiCtx,
    x: 40 + shakeX,
    y: 7 + shakeY,
    text: `${stepsPerformed}`,
    color: getStepColor(stepsPerformed),
  });

  // Draw the key icon and count
  const keyTile = TILE_DATA['key'].tiles[0];
  const keyColors = TILE_DATA['key'].colors || ['#000', '#f00', '#0f0', '#00f'];
  drawTile(keyTile, keyColors, 4.5, 0.2, { context: uiCtx });

  // Draw current level
  textManager.text({
    ctx: uiCtx,
    x: 120,
    y: 7,
    text: `LEVEL: ${currentLevel + 1}`,
    color: 'rgb(255,255,255)',
  });

  textManager.text({
    ctx: uiCtx,
    x: 90,
    y: 7,
    text: `x${collectedKeysNumber}`,
    color: 'rgb(255,255,255)',
  });

  textManager.text({
    ctx: uiCtx,
    x: 270,
    y: 7,
    text: `R: RESET`,
    color: 'rgb(255,255,255)',
  });
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
