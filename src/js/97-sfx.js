/**
 * @module sfx
 */
let hasPlayedWallSoundDuringKeyHold = false;

/**
 * Play the action sound effect
 * @param {string} tile - The tile type
 */
function playActionSound(tile) {
  switch (tile) {
    case 'gong-trigger':
      zzfx(...[, 0, 523.2511, 0.02, , 1.5, 1, 0.5, -0.05, 0.5, , , 0.3, 0.05, , , 0.05, 0.8, , 0.05]); // Sound Default
      break;
    case 'crate':
      zzfx(...[, 0.1, 150, 0.05, , , , 1.3, , , , , , 3]);
      break;
    case 'key':
      zzfx(...[, 0, 1320, , 0.1, 0.3, 1, 1.82, , , 880, 0.05]);
      break;
    case 'wall':
      if (!hasPlayedWallSoundDuringKeyHold) {
        hasPlayedWallSoundDuringKeyHold = true;
        zzfx(...[, 0, 440, 0.15, 0.01, 0.12, 1, 1.59, -6.98, 4.97]);
      }
      break;
    default:
      console.warn(`No sound effect for tile: ${tile}`);
      break;
  }
}
