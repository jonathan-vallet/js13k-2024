let gamepadButtonState = Array(16).fill(false); // Save the state of the buttons to avoid multiple inputs
let gamepadIndex = null; // Save the index of the gamepad
const gamepadButtonMapping = {
  12: 'up', // D-Pad Up
  13: 'down', // D-Pad Down
  14: 'left', // D-Pad Left
  15: 'right', // D-Pad Right
  0: 'action', // Bouton A
  1: 'undo', // Bouton B
  2: 'reset', // Bouton X
  4: 'reset', // Left Bumper
  5: 'undo', // Right Bumper
  9: 'menu', // Start button
};

// Check for gamepad connection
window.addEventListener('gamepadconnected', (e) => {
  // Check if the gamepad is a standard gamepad
  if (e.gamepad.mapping !== 'standard') {
    return;
  }
  gamepadIndex = e.gamepad.index;
});

// Check for gamepad disconnection
window.addEventListener('gamepaddisconnected', (e) => {
  if (e.gamepad.index === gamepadIndex) {
    gamepadIndex = null;
  }
});

function handleGamepadInput() {
  const gamepads = navigator.getGamepads();
  if (!gamepads) {
    return;
  }

  const gamepad = gamepads[gamepadIndex]; // Get the gamepad
  if (gamepad) {
    for (let i = 0; i < gamepad.buttons.length; i++) {
      // Ignore buttons that are not mapped
      if (!gamepadButtonMapping[i]) {
        continue;
      }
      const buttonPressed = gamepad.buttons[i].pressed;

      // If the button is pressed -> keydown
      if (buttonPressed && !gamepadButtonState[i]) {
        handleInput(gamepadButtonMapping[i]);
      }

      // If the button was pressed before but not anymore -> keyup
      if (!buttonPressed && gamepadButtonState[i]) {
        handleRelease(gamepadButtonMapping[i]);
      }

      // Update the state of the button
      gamepadButtonState[i] = buttonPressed;
    }
  }
}
