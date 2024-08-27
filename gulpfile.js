const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const inlineSource = require('gulp-inline-source');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const replace = require('gulp-replace');

// Define replacements for shortening the code
const replacements = {
  // html elements
  gameBackgroundCanvas: 'gBC',
  gameCanvas: 'gC',
  editorOrientationSelect: 'eOS',
  editorTileSelect: 'eTS',
  editorCanvas: 'eC',
  // colors
  blueGreen: 'bG',
  green: 'g',
  bronze: 'br',
  purple: 'p',
  sand: 's',

  // tile names
  // 'block-trigger': 'bT',
  // crate: 'c',
  // 'hole-filled': 'hF',
  // hole: 'h',
  // flag: 'f',
  // 'gong-trigger': 'gT',
  // 'spawn-current': 'sC',
  // gong: 'g',
  // 'key-holder': 'kH',

  // object properties
  canChangeOrientation: 'cCO',
  colors: 'co',
  isStatic: 'iS',
  orientation: 'o',
  rle: 'r',
};

// Chemins de fichiers
const paths = {
  html: './src/index.html',
  scripts: './src/js/**/*.js',
  dist: './dist',
  zipDest: './zip/game.zip',
};

const MAX_SIZE = 13312; // 13,312 bytes = 13 KB

// Concaténer les scripts JS sans minification (pour le développement)
gulp.task('scripts-dev', function () {
  return gulp
    .src(paths.scripts)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(paths.dist))
    .on('error', function (err) {
      console.error('Error in scripts-dev task', err.toString());
    });
});

// Minifier et concaténer les scripts JS (pour la production)
gulp.task('scripts-prod', function () {
  return gulp
    .src(paths.scripts)
    .pipe(concat('bundle.js'))
    .pipe(terser())
    .pipe(gulp.dest(paths.dist))
    .on('error', function (err) {
      console.error('Error in scripts-prod task', err.toString());
    });
});

// Minifier et Inliner les scripts dans l'HTML
gulp.task('minify-html', function () {
  return new Promise((resolve, reject) => {
    gulp
      .src(paths.html)
      .pipe(inlineSource({ compress: false, rootpath: paths.dist })) // Inline le fichier généré
      .on('error', reject) // Gestion des erreurs pour l'inlining
      .pipe(
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
          minifyJS: true,
        }),
      )
      .on('error', reject) // Gestion des erreurs pour la minification HTML
      .pipe(gulp.dest(paths.dist))
      .on('end', resolve) // Résoudre la Promise lorsque c'est terminé
      .on('error', reject); // Gestion des erreurs finales
  });
});

// Minify CSS files
gulp.task('minify-css', function () {
  return gulp.src(paths.html).pipe(cleanCSS()).pipe(gulp.dest(paths.dist));
});

// Tâche pour zipper uniquement 'index.html' avec archiver
gulp.task('zip', function (done) {
  const output = fs.createWriteStream(paths.zipDest);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    const zipSize = archive.pointer();
    const percentageOfLimit = (zipSize / MAX_SIZE) * 100;
    console.log(`Zipped size: ${zipSize} bytes`);
    console.log(`You are using ${percentageOfLimit.toFixed(2)}% of the 13 KB limit (13,312 bytes).`);
    done();
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);
  archive.file(path.join(paths.dist, 'index.html'), { name: 'index.html' });
  archive.finalize();
});

// Apply the replacements to the minified files
gulp.task('replace', function () {
  let stream = gulp.src(path.join(paths.dist, '**/*.{js,html}')); // Apply to all JS and HTML files in the dist folder
  for (const [original, replacement] of Object.entries(replacements)) {
    stream = stream.pipe(replace(original, replacement));
  }
  return stream.pipe(gulp.dest(paths.dist));
});

// Serveur de développement avec BrowserSync et LiveReload
gulp.task('serve', function () {
  // Initialiser BrowserSync et servir le dossier dist
  browserSync.init({
    server: {
      baseDir: paths.dist,
    },
  });

  // Regarder les changements et rafraîchir automatiquement
  gulp.watch(paths.scripts, gulp.series('scripts-dev', 'minify-html')).on('change', browserSync.reload);
  gulp.watch(paths.html, gulp.series('minify-html')).on('change', browserSync.reload);
});

// Tâche 'watch' : Surveille les fichiers et régénère à la volée (sans zip, sans minification JS)
gulp.task('watch', function () {
  gulp.watch(paths.scripts, gulp.series('scripts-dev', 'minify-html'));
  gulp.watch(paths.html, gulp.series('minify-html'));
});

// Tâche 'zip' : Exécuter tout (scripts, minify-html, zip)
gulp.task('zip', gulp.series('scripts-prod', 'minify-css', 'minify-html', 'replace', 'zip'));

// Tâche par défaut : Utiliser la tâche 'serve' pour le développement avec live reload
gulp.task('default', gulp.series('scripts-dev', 'minify-html', 'serve'));
