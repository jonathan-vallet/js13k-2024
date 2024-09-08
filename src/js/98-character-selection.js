let characterData = {
  gender: 0, // 0 = boy, 1 = girl
  skin: 0,
  hair: 0,
  outfit: 0,
};

const selectionOptions = {
  gender: ['boy', 'girl'],
  skin: skinColors,
  hair: hairColors,
  outfit: outfitColors,
};

let selectionStageList = ['gender', 'skin', 'hair', 'outfit'];
let selectionStageIndex = 0;

function drawCharacterSelectionScreen() {
  drawBackground();

  const titles = {
    gender: 'SELECT GENDER',
    skin: 'SELECT SKIN COLOR',
    hair: 'SELECT HAIR COLOR',
    outfit: 'SELECT OUTFIT COLOR',
  };

  writeText({
    ctx: ctx,
    x: 50,
    y: 70,
    hspacing: 2,
    text: titles[selectionStageList[selectionStageIndex]],
    color: '#000',
  });

  if (selectionStageIndex === 0) {
    // Draw gender options
    selectionOptions.gender.forEach((option, index) => {
      writeText({
        ctx: ctx,
        x: 50,
        y: 85 + index * 15,
        hspacing: 2,
        text: option.toUpperCase(),
        color: index === currentMenuIndex ? '#ff0' : '#000',
      });
    });
  } else {
    // Draw color selector
    drawColorSelector(
      selectionOptions[selectionStageList[selectionStageIndex]],
      characterData[selectionStageList[selectionStageIndex]],
      50,
      85,
    );
  }

  // Draw character at 3x scale
  setCharacterDirection(ORIENTATION_DOWN);
  characterScale = 3;
  characterX = 13;
  characterY = 5;
  drawCharacter();
}

function drawColorSelector(colors, selectedColorIndex, x, y) {
  const circleRadius = 4 * zoomFactor;
  colors.forEach((color, index) => {
    ctx.beginPath();
    ctx.arc(x * zoomFactor + index * (circleRadius * 3), y * zoomFactor, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    if (index === selectedColorIndex) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ff0';
      ctx.stroke();
    }
  });
}

// Handle key events
function handleCharacterSelectionKeydown(key, e) {
  const optionLength = selectionOptions[selectionStageList[selectionStageIndex]].length;
  const updateIndex = (direction) => {
    if (selectionStageIndex === 0) {
      currentMenuIndex = (currentMenuIndex + direction + optionLength) % optionLength;
      characterData.gender = currentMenuIndex;
    } else {
      const stage = selectionStageList[selectionStageIndex];
      characterData[stage] = (characterData[stage] + direction + optionLength) % optionLength;
      console.log(stage, selectionOptions[stage], characterData, characterData[stage]);
      TILE_DATA['characters'].colors[selectionStageIndex] = selectionOptions[stage][characterData[stage]];
    }
  };

  if (key === 'up' || key === 'down') {
    updateIndex(key === 'up' ? -1 : 1);
  } else if (key === 'left' || key === 'right') {
    updateIndex(key === 'left' ? -1 : 1);
  }

  if (e.key === 'Enter') {
    ++selectionStageIndex;
    currentMenuIndex = 0;
    if (selectionStageIndex >= selectionStageList.length) {
      // Character selection completed, switch to game mode
      switchMode('game');
    }
  }
}
