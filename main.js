"use strict";

var inputTxt = "";
var game;

//called when a new file is uploaded
function readInput(ev) {
  if (!ev.target.file?.length) {
    var re = new FileReader();
    re.onloadend = () => {
      initGame();
    };
    re.onload = () => {
      inputTxt = re.result;
    };
    re.readAsText(ev.target.files[0]);
  }
}

function initGame() {
  Board.destroy();
  game = new Game(inputTxt);

  if (game.isValid) {
    game.generateBoard();
    document.getElementById("btnContainer").style.display = "block";
    window.scrollTo(0, document.body.scrollHeight);
  }
}
//called on click
function nextStep() {
  game.nextStep();
}
//called on click
function allSteps(ms) {
  game.allSteps(ms);
}
