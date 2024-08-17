function decodeRLE(rleString) {
  const START_CHAR_CODE = 'A'.charCodeAt(0); // Premier caractère de la plage
  const MAX_CHAR_PER_GROUP = 12; // 12 couleurs par groupe (A à L pour transparent, M à X pour noir, etc.)
  const pixels = [];

  const imageWidth = parseInt(rleString.match(/^\d+/)[0], 10); // Extraire et convertir les chiffres en entier
  rleString = rleString.replace(/^\d+/, ''); // Supprimer la largeur de la chaîne RLE

  for (let i = 0; i < rleString.length; ++i) {
    const char = rleString[i];
    const charCodeOffset = char.charCodeAt(0) - START_CHAR_CODE;

    // Déterminer la couleur (index) et la longueur (nombre de pixels)
    const colorIndex = Math.floor(charCodeOffset / MAX_CHAR_PER_GROUP); // Calcul de l'index de la couleur
    const runLength = (charCodeOffset % MAX_CHAR_PER_GROUP) + 1; // Longueur du run

    // Ajouter les pixels décodés à la liste des pixels
    pixels.push(...Array(runLength).fill(colorIndex));
  }

  return { pixels, imageWidth };
}

function convertTo2DArray(pixels, imageWidth) {
  const rows = [];
  for (let i = 0; i < pixels.length; i += imageWidth) {
    rows.push(pixels.slice(i, i + imageWidth));
  }
  return rows;
}

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

let pixelList = [];
// Decoding and processing the sprite
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
