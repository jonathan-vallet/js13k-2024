const menuOptions = [
  { text: 'CONTINUE', action: 'continue', isDisabled: true },
  { text: 'NEW GAME', action: 'newGame', isDisabled: false },
  { text: 'LEVEL EDITOR', action: 'levelEditor', isDisabled: false },
];
let currentMenuIndex = 1; // Index of the currently selected menu item

let menuZones = []; // To store clickable areas
function drawStartScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const menuStartX = 50; // X-coordinate for menu start
  const menuStartY = 100; // Y-coordinate for menu start
  const menuSpacing = 20; // Space between menu items

  menuZones = []; // Clear previous zones

  menuOptions.forEach((option, index) => {
    const yPosition = menuStartY + index * menuSpacing;
    const isHighlighted = index === currentMenuIndex;

    // Draw the option text
    textManager.text({
      ctx: ctx,
      x: menuStartX,
      y: yPosition,
      scale: 3,
      text: option.text,
      color: isHighlighted ? 'rgb(255,255,0)' : option.isDisabled ? 'rgb(150,150,150)' : 'rgb(255,255,255)',
    });

    // Store clickable zone (a bit wider and taller than the text)
    menuZones.push({
      x: menuStartX - 10,
      y: yPosition - 10,
      width: 200, // Adjust width as needed
      height: 20, // Adjust height as needed
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
      // Logique pour continuer le jeu
      currentScreen = 'game';
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
