var inputTxt = "";
var game;
var board;

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
  game = new Game(inputTxt);

  if (game.isValid) {
    game.generateBoard();
    createButtons();
  }
}

function nextstep() {
    game.nextStep();
  }
  function allSteps() {
    game.allSteps();
  }

function createButtons() {
  var body = document.getElementsByTagName("body")[0];

  var btn = document.createElement("BUTTON");
  btn.setAttribute("id", "nextBtn");
  btn.innerText = "Next step";
  btn.addEventListener("click", nextstep);
  body.appendChild(btn);

  btn = document.createElement("BUTTON");
  btn.setAttribute("id", "allBtn");
  btn.innerText = "All steps";
  btn.addEventListener("click", allSteps);
  body.appendChild(btn);


}
