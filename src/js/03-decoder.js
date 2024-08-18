/**
 * This file contains the functions to decode the RLE string and process the sprites
 * @module 03-decoder
 */
let pixelList = [];

/**
 * Decode the RLE string into an array of pixel values
 * @param {string} rleString - The RLE string to decode
 * @returns {object} - An object containing the pixel values and image width
 */
function decodeRLE(rleString) {
  const START_CHAR_CODE = 'A'.charCodeAt(0); // First character code in the RLE string
  const MAX_CHAR_PER_GROUP = 12; // colors per group
  const pixels = [];

  const imageWidth = parseInt(rleString.match(/^\d+/)[0], 10); // Extract the image width
  rleString = rleString.replace(/^\d+/, '');

  for (let i = 0; i < rleString.length; ++i) {
    const char = rleString[i];
    const charCodeOffset = char.charCodeAt(0) - START_CHAR_CODE;

    // Calculating the color index and run length
    const colorIndex = Math.floor(charCodeOffset / MAX_CHAR_PER_GROUP);
    const runLength = (charCodeOffset % MAX_CHAR_PER_GROUP) + 1;

    pixels.push(...Array(runLength).fill(colorIndex));
  }

  return { pixels, imageWidth };
}

/**
 * Convert a 1D array of pixels into a 2D array, given the image width
 * @param {number[]} pixels - The 1D array of pixel values
 * @param {number} imageWidth - The width of the image
 * @returns {number[][]} - A 2D array of pixel values
 */
function convertTo2DArray(pixels, imageWidth) {
  const rows = [];
  for (let i = 0; i < pixels.length; i += imageWidth) {
    rows.push(pixels.slice(i, i + imageWidth));
  }
  return rows;
}

/**
 * Slice the 2D image array into 16x16 tiles
 * @param {number[][]} image2DArray - The 2D array of pixel values
 * @param {number} tileWidth - The width of the tile
 * @param {number} tileHeight - The height of the tile
 * @returns {number[][][]} - An array of 16x16 tiles
 */
function sliceIntoTiles(image2DArray, tileWidth, tileHeight) {
  const tiles = [];
  const numRows = image2DArray.length;
  const numCols = image2DArray[0].length;

  for (let row = 0; row < numRows; row += tileHeight) {
    for (let col = 0; col < numCols; col += tileWidth) {
      const tile = [];
      for (let y = 0; y < tileHeight; y++) {
        tile.push(image2DArray[row + y].slice(col, col + tileWidth));
      }
      tiles.push(tile);
    }
  }
  return tiles;
}

/**
 * Process a sprite image and return the tiles
 * @param {string} imageKey - The key of the image in the IMAGE_LIST
 * @returns {object} - An object containing the tiles of the sprite
 */
function processSprite(imageKey) {
  const rleString = IMAGE_LIST[imageKey];
  const pixels = decodeRLE(rleString);
  pixelList = pixels.pixels;

  const image2DArray = convertTo2DArray(pixels.pixels, pixels.imageWidth);
  // Slice into 16x16 tiles
  const tiles = sliceIntoTiles(image2DArray, 16, 16);

  return { tiles }; // This will return an array of tiles, each tile being a 16x16 array of pixels
}

// Processing all sprites
function processAllSprites() {
  const processedSprites = [];

  for (const imageKey in IMAGE_LIST) {
    processedSprites[imageKey] = processSprite(imageKey);
  }

  return processedSprites;
}

const GAME_SPRITES = processAllSprites();
