// // To customize the character colors for hair, skin, and clothes

// // Initialisation des couleurs
// let colorMap = [
//     '#ffffff',  // Transparent (ou blanc pour visualisation)
//     '#000000',  // Noir
//     '#ff0000',  // Rouge
//     '#00ff00',  // Vert
//     '#0000ff'   // Bleu
// ];
// let genderOffset = 0;  // Offset pour le genre (0 pour garçon, 1 pour fille)

//   // Fonction pour mettre à jour la couleur et redessiner le canvas
//   function updateColor(colorIndex, newColor) {
//     colorMap[colorIndex] = newColor;
//     drawPixelsOnCanvas(pixelList, 144, 4, colorMap, genderOffset);
//   }

//   // Événements pour mettre à jour les couleurs
//   document.getElementById('redColor').addEventListener('input', (e) => {
//     updateColor(2, e.target.value);  // Rouge
//   });

//   document.getElementById('greenColor').addEventListener('input', (e) => {
//     updateColor(3, e.target.value);  // Vert
//   });

//   document.getElementById('blueColor').addEventListener('input', (e) => {
//     updateColor(4, e.target.value);  // Bleu
//   });

//   // Événements pour le choix du genre (boy/girl)
//   document.getElementById('boy').addEventListener('change', (e) => {
//     if (e.target.checked) {
//       genderOffset = 0;  // Boy -> Offset 0
//       drawPixelsOnCanvas(pixelList, 144, 4, colorMap, genderOffset);
//     }
//   });

//   document.getElementById('girl').addEventListener('change', (e) => {
//     if (e.target.checked) {
//       genderOffset = 1;  // Girl -> Offset 1
//       drawPixelsOnCanvas(pixelList, 144, 4, colorMap, genderOffset);
//     }
//   });

//   // Dessin initial du canvas
//   updateColor(2, document.getElementById('redColor').value);
//   updateColor(3, document.getElementById('greenColor').value);
//   updateColor(4, document.getElementById('blueColor').value);
//   drawPixelsOnCanvas(pixelList, 144, 4, colorMap);

//   function drawPixelsOnCanvas(pixels, imageWidth, scaleFactor, colorMap, genderOffset = 0) {

//     const imageHeight = Math.ceil(pixels.length / imageWidth);  // Calculer la hauteur de l'image

//     // Effacer le canvas précédent
//     const container = document.getElementById('canvasContainer');
//     container.innerHTML = '';  // Supprimer l'ancien canvas

//     // Créer un nouveau canvas
//     const canvas = document.createElement('canvas');
//     canvas.width = imageWidth * scaleFactor;
//     canvas.height = imageHeight * scaleFactor;
//     // canvas.width = 16 * scaleFactor;
//     // canvas.height = 16 * scaleFactor;
//     const ctx = canvas.getContext('2d');

//     // Parcourir les pixels et dessiner chaque pixel sur le canvas, avec le facteur d'échelle
//     let x = 0;
//     let y = 0;
//     pixels.forEach(pixel => {
//       if(x <= 16 && ((genderOffset === 0 && y < 16) || (genderOffset === 1 && y >= 16))) {
//         ctx.fillStyle = colorMap[pixel];
//         ctx.fillRect(x * scaleFactor, (y - genderOffset * 16) * scaleFactor, scaleFactor, scaleFactor);  // Dessiner un pixel agrandi
//       }
//       x++;
//       if (x >= imageWidth) {
//         x = 0;
//         y++;
//       }

//     });
//     // Ajouter le canvas au DOM pour visualisation (optionnel)
//     container.appendChild(canvas);
//   }
