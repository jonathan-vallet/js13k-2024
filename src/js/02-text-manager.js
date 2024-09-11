const pixelArtLetters = {
  1: '010110010010111',
  2: '01101001001001001111',
  3: '11100001001100011110',
  4: '00110101100111110001',
  5: '11111000111100011110',
  6: '01101000111010010110',
  7: '11110001001000100010',
  8: '01101001011010010110',
  9: '01101001011100010110',
  0: '01101001100110010110',
  A: '01101001111110011001',
  B: '110101110101110',
  C: '011100100100011',
  D: '110101101101110',
  E: '111100111100111',
  F: '111100111100100',
  G: '01111000101110010110',
  H: '10011001111110011001',
  I: '111010010010111',
  // J: '00010001000110010110',
  K: '10011010110010101001',
  L: '100100100100111',
  M: '1000111011101011000110001',
  N: '10011101101110011001',
  O: '01101001100110010110',
  P: '11101001111010001000',
  // Q: '01101001100110100101',
  R: '11101001111010101001',
  S: '01111000011000011110',
  T: '111010010010010',
  U: '10011001100110010110',
  V: '1000110001010100101000100',
  W: '1010110101101010101001010',
  // X: '10011001011010011001',
  Y: '10011001111100011110',
  Z: '11110001011010001111',
  ' ': '000000000000000',
  // ',': '000000000001001',
  // '.': '000000000000001',
  '!': '010010010000010',
  // '/': '0000100010001000100010000',
  ':': '000010000010000',
  x: '000000101010101',
};

/**
 * Render a single line of text
 * @param {object} options - The text rendering options
 */
function writeTextLine(opt) {
  const LETTER_HEIGHT = 5;
  let letterX = 0;

  for (let i = 0; i < opt.text.length; i++) {
    const char = opt.text.charAt(i);
    const letter = pixelArtLetters[char];
    const letterWidth = letter.length / LETTER_HEIGHT; // Calculate the width based on the total length divided by the height
    for (let y = 0; y < LETTER_HEIGHT; y++) {
      for (let x = 0; x < letterWidth; x++) {
        const pixelIndex = y * letterWidth + x;
        if (letter[pixelIndex] === '1') {
          opt.ctx.rect(
            (opt.x + (x + letterX + opt.hspacing * i)) * zoomFactor * opt.scale,
            (opt.y + y) * zoomFactor * opt.scale,
            zoomFactor * opt.scale,
            zoomFactor * opt.scale,
          );
        }
      }
    }
    letterX += letterWidth; // Increment letterX by the width of the current letter
  }
}

/**
 * Render multi-line text
 * @param {object} options - The text rendering options
 */
function writeText(options) {
  const defaultOptions = {
    x: 0,
    y: 0,
    text: '',
    vspacing: 0,
    hspacing: 1,
    color: '#fff',
    scale: 1,
  };
  const opt = { ctx: ctx, ...defaultOptions, ...options }; // Merge with defaults
  const lines = opt.text.split('\n');

  const letterSize = 5 * zoomFactor * opt.scale;

  // Begin drawing
  opt.ctx.beginPath();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const x = opt.x;
    const y = opt.y + (letterSize + opt.vspacing * zoomFactor * opt.scale) * i;
    writeTextLine({
      ctx: opt.ctx,
      x,
      y,
      text: line,
      hspacing: opt.hspacing,
      scale: opt.scale,
    });
  }

  opt.ctx.fillStyle = opt.color;
  opt.ctx.fill();
}
