let canContinue = getLocalStorage('currentLevel') !== null;

const menuOptions = [
  { text: 'CONTINUE', action: 'continue', isDisabled: !canContinue },
  { text: 'NEW GAME', action: 'newGame' },
  { text: 'LEVEL SELECTION', action: 'levelSelector' },
  { text: 'LEVEL EDITOR', action: 'levelEditor' },
];
let currentMenuIndex = canContinue ? 0 : 1; // Index of the currently selected menu item

function drawBackground() {
  let backgroundImage = new Image();
  backgroundImage.src =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAACgAgMAAABWEiUVAAAACVBMVEUBOZocAGYAkMzM6PIZAAAARklEQVQY02MIJROKAnEgEAvCaDB2BeIQIHaBY0YkWgCIGcCYBYgd4DQtQAMQcwBxBxgrALESGK8A4i4gXgXGi4BYC4jJhgDoJyriwWJx+QAAAABJRU5ErkJggg==';

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

  const menuStartX = 50; // X-coordinate for menu start
  const menuStartY = 70; // Y-coordinate for menu start
  const menuSpacing = 15; // Space between menu items

  menuOptions.forEach((option, index) => {
    const yPosition = menuStartY + index * menuSpacing;
    const isHighlighted = index === currentMenuIndex;

    writeText({
      ctx: ctx,
      x: menuStartX,
      y: yPosition,
      hspacing: 2,
      text: option.text,
      color: isHighlighted ? '#ff0' : option.isDisabled ? '#999' : '#000',
    });
  });
}

function handleMenuAction(action) {
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

function handleMenuKeydown(key, e) {
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
  }
  if (e.key === 'Enter') {
    const selectedOption = menuOptions[currentMenuIndex];
    if (!selectedOption.isDisabled) {
      handleMenuAction(selectedOption.action);
    }
  }
}
