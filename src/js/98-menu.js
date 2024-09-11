const menuOptions = [
  { text: 'CONTINUE', action: 'continue' },
  { text: 'NEW GAME', action: 'newGame' },
  { text: 'LEVEL SELECTION', action: 'levelSelector' },
  { text: 'LEVEL EDITOR', action: 'levelEditor' },
];
let currentMenuIndex = canContinue() ? 0 : 1; // Index of the currently selected menu item

function canContinue() {
  return getLocalStorage('currentLevel') !== null;
}

function drawBackground() {
  let backgroundImage = new Image();
  backgroundImage.src =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAACgAgMAAABWEiUVAAAACVBMVEVelt05U8Gc2PyB3HZ+AAAARklEQVQY02MIJROKAnEgEAvCaDB2BeIQIHaBY0YkWgCIGcCYBYgd4DQtQAMQcwBxBxgrALESGK8A4i4gXgXGi4BYC4jJhgDoJyriwWJx+QAAAABJRU5ErkJggg==';

  if (backgroundImage.height) {
    // Calcule l'échelle pour que l'image prenne 100% de la hauteur du canvas
    let scaleFactor = backgroundCtx.canvas.height / backgroundImage.height;
    let newHeight = backgroundCtx.canvas.height;
    let newWidth = backgroundImage.width * scaleFactor;

    let tempCanvas = document.createElement('canvas');
    tempCanvas.width = newWidth;
    tempCanvas.height = newHeight;

    let tempCtx = tempCanvas.getContext('2d');
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(backgroundImage, 0, 0, newWidth, newHeight);

    for (let x = 0; x < backgroundCtx.canvas.width; x += newWidth) {
      backgroundCtx.drawImage(tempCanvas, x, 0, newWidth, newHeight);
    }
  }

  ctx.drawImage(backgroundCanvas, 0, 0, canvas.width, canvas.height);
}

function drawStartScreen() {
  drawBackground();

  const menuStartX = 30; // X-coordinate for menu start
  const menuStartY = 30; // Y-coordinate for menu start
  const menuSpacing = 12; // Space between menu items

  menuOptions.forEach((option, index) => {
    const yPosition = menuStartY + index * menuSpacing;
    const isHighlighted = index === currentMenuIndex;
    option.isDisabled = index === 0 && !canContinue();

    writeText({
      ctx: ctx,
      x: menuStartX,
      y: yPosition,
      hspacing: 2,
      text: option.text,
      color: isHighlighted ? COLOR_SELECTED : option.isDisabled ? '#999' : COLOR_TEXT,
      scale: 1.5,
    });
  });
}

function handleMenuAction(action) {
  if (isSoundActive) {
    playMusicControl();
  }

  switch (action) {
    case 'continue':
      currentLevel = parseInt(getLocalStorage('currentLevel'));
      switchMode('game');
      break;
    case 'newGame':
      setTimeout(() => {
        currentMenuIndex = 0;
        switchMode('characterSelection');
      }, 0);
      break;
    case 'levelSelector':
      setTimeout(() => {
        switchMode('levelSelector');
      }, 0);
      break;
    case 'levelEditor':
      switchMode('editor');
      break;
  }
}

function handleMenuKeydown(key) {
  switch (key) {
    case 'up':
      currentMenuIndex = (currentMenuIndex - 1 + menuOptions.length) % menuOptions.length;
      if (menuOptions[currentMenuIndex].isDisabled)
        currentMenuIndex = (currentMenuIndex - 1 + menuOptions.length) % menuOptions.length;
      break;
    case 'down':
      currentMenuIndex = (currentMenuIndex + 1) % menuOptions.length;
      if (menuOptions[currentMenuIndex].isDisabled) currentMenuIndex = (currentMenuIndex + 1) % menuOptions.length;
      break;
    case 'action':
      const selectedOption = menuOptions[currentMenuIndex];
      if (!selectedOption.isDisabled) {
        handleMenuAction(selectedOption.action);
      }
      break;
  }
}
