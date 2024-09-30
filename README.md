# JS13K 2024

This repository allow you to quick start your JS13K project to develop, compile, minify and zip you JS13K project.

Uses gulp to concat JS, minify assets...

## Installing

node: v20+

Run `npm install` in the project directory to install all needed packages.

## Coding fr JS13K

Create/update files in `src` folder.

- use functions instead of objects, for a better minification of JS and take less place (so more place for more content).
- use global variable (there is a closure to keep in game environment)

In src/js, files a prefixed with numbers to set the loading order of your files.

## Gulp commands

`npx gulp serve` will host the game on a local web server

## Generate you final game

`npx gulp zip` creates the zip file for competition and concatenates css/js in a single html file to add more optimisation

Once done, go to https://lifthrasiir.github.io/roadroller/ and paste &lt;script&gt; content from index.html in dist folder. Replace it with output eval.

Then run `npx gulp zip-only` to create a zip under 13kb

Your game.zip file will be generated in `/dist` and `/zip` folder.

## Post mortem

You can read the most mortem on the [POST_MORTEM.md](POST_MORTEM.md) file
