# JS13K 2024

This repository allow you to quick start your JS13K project to develop, compile, minify and zip you JS13K project.

Uses gulp to concat JS, minify assets...

## Installing

node: v20+

Run `npm install` in the project directory to install all needed packages.

## Coding fr JS13K

Create/update files in `src` folder.

I use functions instead of objects, for a better minification of JS and take less place (so more place for more content).

In src/js, files a prefixed with numbers to set the loading order order of your files.

## Gulp commands

`npx gulp serve` will host the game on a local web server

## Generate you final game

`npx gulp zip` creates the zip file for competition and concatenates css/js in a single html file to add more optimisation

Your game.zip file will be generated in `/dist` and `/zip` folder.
