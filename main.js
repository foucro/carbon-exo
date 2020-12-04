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
    // if (!document.getElementById("allBtn")) createButtons();
    document.getElementById("btnContainer").style.display = "block";
  }
}
//called on click
function nextStep() {
  game.nextStep();
}
//called on click
function allSteps() {
  game.allSteps();
}

function createButtons() {
  var body = document.getElementsByTagName("body")[0];

  var btn = document.createElement("BUTTON");
  btn.setAttribute("id", "nextBtn");
  btn.innerText = "Next step";
  btn.addEventListener("click", nextStep);
  body.appendChild(btn);

  btn = document.createElement("BUTTON");
  btn.setAttribute("id", "allBtn");
  btn.innerText = "All steps";
  btn.addEventListener("click", allSteps);
  body.appendChild(btn);
}
