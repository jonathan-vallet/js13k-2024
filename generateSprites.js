const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

// Path to the input directory and output file
const INPUT_DIR = './assets/images'; // Replace with your actual assets folder
const OUTPUT_FILE = './assets/sprites.json';
const START_CHAR_CODE = 'A'.charCodeAt(0); // First character in the range
const COLORS_PER_GROUP = 12; // colors per group (A to L for transparent, M to X for black, etc.)

// Function to encode a PNG file to a RLE string
function encodePngToRLE(filePath) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(new PNG())
      .on('parsed', function () {
        let rleString = this.width.toString();
        let lastPixel = null;
        let runLength = 0; // Add the width of the image as the first character to reconstruct the image later

        // Parcourir chaque pixel de l'image PNG
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            const idx = (this.width * y + x) << 2; // Calculate the index of the pixel

            const r = this.data[idx];
            const g = this.data[idx + 1];
            const b = this.data[idx + 2];
            const a = this.data[idx + 3];

            // Determine the color of the pixel
            let currentPixel;
            if (r === 255 && g === 255 && b === 255) {
              currentPixel = 0; // White
            } else if (r === 0 && g === 0 && b === 0) {
              currentPixel = 1; // Black
            } else if (r === 255 && g === 0 && b === 0) {
              currentPixel = 2; // Red
            } else if (r === 0 && g === 255 && b === 0) {
              currentPixel = 3; // Green
            } else if (r === 0 && g === 0 && b === 255) {
              currentPixel = 4; // Blue
            } else {
              console.log(
                `Couleur inconnue: r=${r}, g=${g}, b=${b} au pixel (${x}, ${y}) dans ${filePath}`,
              );
              continue;
            }

            // Implement the RLE encoding
            if (currentPixel === lastPixel) {
              runLength++;
              if (runLength === COLORS_PER_GROUP) {
                // Limit the run length to 12
                rleString += String.fromCharCode(
                  START_CHAR_CODE +
                    lastPixel * COLORS_PER_GROUP +
                    (runLength - 1),
                );
                runLength = 0;
              }
            } else {
              if (lastPixel !== null && runLength > 0) {
                rleString += String.fromCharCode(
                  START_CHAR_CODE +
                    lastPixel * COLORS_PER_GROUP +
                    (runLength - 1),
                );
              }
              lastPixel = currentPixel;
              runLength = 1;
            }
          }
        }

        // Add the last run of pixels
        if (lastPixel !== null && runLength > 0) {
          rleString += String.fromCharCode(
            START_CHAR_CODE + lastPixel * COLORS_PER_GROUP + (runLength - 1),
          );
        }

        resolve(rleString);
      })
      .on('error', reject);
  });
}

// Helper function to encode a run of pixels in RLE
function encodeRun(color, length) {
  const START_CHAR_CODE = COLOR_MAP[color].charCodeAt(0);
  // Vérifier que la longueur est dans la plage (1 à 12)
  if (length < 1 || length > 12) {
    throw new Error(`Run length ${length} out of bounds for color ${color}`);
  }
  console.log(
    color,
    length,
    START_CHAR_CODE,
    String.fromCharCode(START_CHAR_CODE + (length - 1)),
  );

  return String.fromCharCode(START_CHAR_CODE + (length - 1));
}

// Main function to read the directory, encode PNG files, and generate the JSON file
async function generateRLEForPngFiles() {
  const outputData = {};

  // Read the input directory
  const files = fs.readdirSync(INPUT_DIR);

  // Filter PNG files
  const pngFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === '.png',
  );

  // Process each PNG file
  for (const file of pngFiles) {
    const filePath = path.join(INPUT_DIR, file);
    const fileName = path.basename(file, path.extname(file)); // File name without extension

    try {
      const rleString = await encodePngToRLE(filePath);
      outputData[fileName] = rleString;
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  // Write the output JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2));
  console.log(`JSON file generated successfully: ${OUTPUT_FILE}`);
}

// Run the main function
generateRLEForPngFiles();
