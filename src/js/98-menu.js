let canContinue = getLocalStorage('currentLevel') !== null;

const menuOptions = [
  { text: 'CONTINUE', action: 'continue', isDisabled: !canContinue },
  { text: 'NEW GAME', action: 'newGame', isDisabled: false },
  { text: 'LEVEL EDITOR', action: 'levelEditor', isDisabled: false },
];
let currentMenuIndex = canContinue ? 0 : 1; // Index of the currently selected menu item

// Redessiner le dégradé avec la nouvelle valeur de 'r'
let r = 0.6; // Valeur initiale pour la force de dithering
let rDirection = 1; // Direction de l'animation (1 pour augmenter, -1 pour diminuer)

let menuZones = []; // To store clickable areas
function drawStartScreen() {
  // Modifier la valeur de 'r' pour animer l'effet
  r += rDirection * 0.005; // Ajuster la vitesse d'animation

  // Inverser la direction si on atteint certaines limites
  if (r > 0.9 || r < 0.6) {
    rDirection *= -1;
  }

  const color1 = '#1c0066';
  const color2 = '#01399a';
  const color3 = '#0090cc';

  // draw a base64 image on background canvas
  let backgroundImage = new Image();
  backgroundImage.src =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAACgAgMAAABWEiUVAAAACVBMVEUBOZocAGYAkMzM6PIZAAAARklEQVQY02MIJROKAnEgEAvCaDB2BeIQIHaBY0YkWgCIGcCYBYgd4DQtQAMQcwBxBxgrALESGK8A4i4gXgXGi4BYC4jJhgDoJyriwWJx+QAAAABJRU5ErkJggg==';

  if (backgroundImage.height) {
    // Calcule l'échelle pour que l'image prenne 100% de la hauteur du canvas
    let scaleFactor = backgroundCtx.canvas.height / backgroundImage.height;
    let newHeight = backgroundCtx.canvas.height;
    let newWidth = backgroundImage.width * scaleFactor;
    // Créer un canvas temporaire pour dessiner l'image à l'échelle désirée sans flou
    let tempCanvas = document.createElement('canvas');
    tempCanvas.width = newWidth;
    tempCanvas.height = newHeight;

    let tempCtx = tempCanvas.getContext('2d');
    tempCtx.imageSmoothingEnabled = false; // S'assurer que le lissage est désactivé dans le canvas temporaire
    tempCtx.drawImage(backgroundImage, 0, 0, newWidth, newHeight);

    // Dessiner l'image répétée horizontalement sur le canvas principal
    for (let x = 0; x < backgroundCtx.canvas.width; x += newWidth) {
      backgroundCtx.drawImage(tempCanvas, x, 0, newWidth, newHeight);
    }
  }
  // Draw the game on background canvas
  ctx.drawImage(backgroundCanvas, 0, 0, canvas.width, canvas.height);

  const menuStartX = 50; // X-coordinate for menu start
  const menuStartY = 70; // Y-coordinate for menu start
  const menuSpacing = 15; // Space between menu items

  menuZones = []; // Clear previous zones

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

    // Store clickable zone (a bit wider and taller than the text)
    menuZones.push({
      x: (menuStartX - 2) * zoomFactor,
      y: (yPosition - menuSpacing / 2.5) * zoomFactor,
      width: 80 * zoomFactor, // Adjust width as needed
      height: menuSpacing * zoomFactor, // Adjust height as needed
      action: option.action,
      isDisabled: option.isDisabled,
    });
  });
}

function handleMenuClick(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  menuZones.forEach((zone) => {
    if (mouseX >= zone.x && mouseX <= zone.x + zone.width && mouseY >= zone.y && mouseY <= zone.y + zone.height) {
      if (!zone.isDisabled) {
        handleMenuAction(zone.action);
      }
    }
  });
}

function handleMenuAction(action) {
  switch (action) {
    case 'continue':
      currentLevel = parseInt(getLocalStorage('currentLevel'));
      switchMode('game');
      break;
    case 'newGame':
      switchMode('game');
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
