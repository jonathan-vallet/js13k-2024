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

  drawDitheredBayerGradient(backgroundCtx, canvas.width, 0, canvas.height / 2.5, color1, color2, r);
  drawDitheredBayerGradient(backgroundCtx, canvas.width, canvas.height / 2.5, canvas.height / 2, color2, color3, r / 2);

  // Draw the game on background canvas
  ctx.drawImage(backgroundCanvas, 0, 0, canvas.width, canvas.height);

  const menuStartX = 5; // X-coordinate for menu start
  const menuStartY = 15; // Y-coordinate for menu start
  const menuSpacing = 4; // Space between menu items

  menuZones = []; // Clear previous zones

  menuOptions.forEach((option, index) => {
    const yPosition = menuStartY + index * menuSpacing;
    const isHighlighted = index === currentMenuIndex;

    writeText({
      ctx: ctx,
      x: menuStartX * zoomFactor,
      y: yPosition * zoomFactor,
      scale: 2,
      text: option.text,
      color: isHighlighted ? '#ff0' : option.isDisabled ? '#999' : '#000',
    });

    // Store clickable zone (a bit wider and taller than the text)
    menuZones.push({
      x: menuStartX - 2,
      y: (yPosition - 6) * zoomFactor,
      width: 80 * zoomFactor, // Adjust width as needed
      height: 16 * zoomFactor, // Adjust height as needed
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
      // Logique pour démarrer un nouveau jeu
      switchMode('game');
      break;
    case 'levelEditor':
      // Logique pour entrer dans l'éditeur de niveau
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

const bayerMatrix4x4 = [
  [-0.5, 0, -0.375, 0.125],
  [0.25, -0.25, 0.375, -0.125],
  [-0.3125, 0.1875, -0.4375, 0.0625],
  [0.4375, -0.0625, 0.3125, -0.1875],
];
const bayerSize = 4;

function drawDitheredBayerGradient(ctx, width, startY, height, color1, color2, r = 0.25) {
  for (let y = 0; y < height; y++) {
    // Calculer la couleur de base pour cette ligne
    const gradientRatio = (y * zoomFactor) / height;
    const baseColorValue = gradientRatio;

    for (let x = 0; x < width; x++) {
      // Appliquer la matrice de Bayer pour dither
      const bayerValue = bayerMatrix4x4[y % bayerSize][x % bayerSize];
      const ditheredValue = baseColorValue + bayerValue * r; // Le facteur 'r' ajuste la force du dither

      // Choisir la couleur en fonction de la valeur ditherée
      const color = ditheredValue < 0.5 ? color1 : color2;
      ctx.fillStyle = color;

      // Dessiner le pixel avec le facteur de zoom
      ctx.fillRect(x * zoomFactor, startY + y * zoomFactor, zoomFactor, zoomFactor);
    }
  }
}
