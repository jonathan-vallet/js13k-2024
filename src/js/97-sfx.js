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
      zzfx(...[, 0, 523.2511, 0.02, , 1.5, 1, 0.5, -0.05, 0.5, , , 0.3, 0.05, , , 0.05, 0.8, , 0.05]);
      break;
    case 'block':
      zzfx(...[, 0, 146.8324, 0.1, , 0, , , , , , , , 4, , , , 0, 0.2]);
      break;
    case 'boulder':
      zzfx(...[, 0, 73.41619, 0.1, , 0, , , , , , , , 4, , , , 0, 0.2]);
      break;
    case 'crate':
      zzfx(...[, 0, 146.8324, 0.05, , 0.05, , 1.3, , , , , , 3]);
      break;
    case 'key':
      zzfx(...[, 0, 1320, , 0.06, 0.3, 1, , , , 880, 0.06]);
      break;
    case 'lock':
      zzfx(...[, 0, 440, 0.1, , , 1, 0.3, , , -110, 0.15, , , , , , , 0.1]); // Loaded Sound 0
      break;
    case 'trap':
      zzfx(...[0.5, 0, 440, 0.08, , 0.2, 4, 2, , , , , , 5]);
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
