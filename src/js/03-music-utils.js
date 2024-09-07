// Generates music to preloaded audio element
function generateMusic(song) {
  musicplayer.init(song);
  while (musicplayer.generate() < 1) {} // Générer la musique
  return musicplayer.createWave(); // Retourner l'onde audio générée
}

/**
 * Play the music
 * @param {Uint8Array} wave - The wave audio data
 * @param {boolean} loop - Loop the music or not
 */
function playMusic(wave, loop = false) {
  musicAudio.src = URL.createObjectURL(new Blob([wave], { type: 'audio/wav' }));
  musicAudio.loop = loop; // Indiquer si la musique doit boucler ou non
  musicAudio.play(); // Jouer la musique
}

/**
 * Play the music control
 */
function playMusicControl() {
  musicAudio.play();
}

/**
 * Stop the music
 */
function stopMusic() {
  musicAudio.pause();
}
