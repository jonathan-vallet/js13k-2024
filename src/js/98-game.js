function setZoomFactor() {
  zoomFactor = Math.min(
    Math.floor(window.innerWidth / (LEVEL_WIDTH * TILE_SIZE)),
    Math.floor((window.innerHeight * 0.89) / (LEVEL_HEIGHT * TILE_SIZE)),
  );
  canvas.width = LEVEL_WIDTH * TILE_SIZE * zoomFactor;
  canvas.height = LEVEL_HEIGHT * TILE_SIZE * zoomFactor;
  uiCanvas.width = canvas.width;
  uiCanvas.height = TILE_SIZE * 1.1 * zoomFactor; // 2 tiles high

  // background canvas has same ratio than canvas but cover window size
  if (window.innerWidth / window.innerHeight > LEVEL_WIDTH / LEVEL_HEIGHT) {
    backgroundCanvas.width = window.innerWidth;
    backgroundCanvas.height = window.innerWidth * (LEVEL_HEIGHT / LEVEL_WIDTH);
  } else {
    backgroundCanvas.height = window.innerHeight;
    backgroundCanvas.width = window.innerHeight * (LEVEL_WIDTH / LEVEL_HEIGHT);
  }
}

function initGame() {
  // Disable image smoothing for sharp pixelated look
  startLevel(currentLevel);
}

window.addEventListener('resize', () => {
  setZoomFactor();
  drawLevelBackground('sand', 'rock');
});

function switchMode(mode) {
  document.body.classList.remove(currentScreen);
  document.body.classList.add(mode);
  currentScreen = mode;
  if (currentScreen === 'game') {
    initGame();
  }
  if (currentScreen === 'editor') {
    initEditor();
  }
}

function initMusic() {
  var introWave, loopWave;

  // Générer l'intro et la boucle au chargement
  introWave = generateMusic(introSong);
  loopWave = generateMusic(loopSong);

  // Jouer l'intro en premier
  playMusic(introWave);

  // Quand l'intro est terminée, passer à la boucle
  musicAudio.addEventListener('ended', function () {
    playMusic(loopWave, true); // Jouer la musique de boucle
  });

  // Lancer la lecture au début
  playMusicControl();
}

function loadGame() {
  // Adjust the canvas size to fit the level size
  ctx.imageSmoothingEnabled = false;
  uiCtx.imageSmoothingEnabled = false;
  backgroundCtx.imageSmoothingEnabled = false;
  setZoomFactor();
  // Checks if url has a level parameter, if so, play that level if it's valid
  const urlParams = new URLSearchParams(window.location.search);
  const levelParam = urlParams.get('level');
  if (levelParam) {
    let customLevel = decodeLevel(levelParam);
    if (customLevel) {
      levels.push(customLevel);
      currentLevel = levels.length - 1;
      switchMode('game');
    }
  } else {
    switchMode(currentScreen);
  }

  preloadSFX();
  initMusic();

  requestAnimationFrame(animate);
}

loadGame();
