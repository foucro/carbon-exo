var inputTxt = "";
var inputLines = [];
var game = new Game();
var board;

function readInput(ev) {
  console.log(ev);
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
  formatInput();
  parseInfo();
  game.verifyData();
  if (game.isValid) {
    game.generateBoard();
    createButtons()
  }
}

function nextstep(){
    game.nextStep();
}

function createButtons(){

    var body = document.getElementsByTagName("body")[0];
    var btn = document.createElement("BUTTON");
    btn.setAttribute('id','nextBtn');
    btn.innerText = 'Next step'
    btn.addEventListener("click", nextstep);
    body.appendChild(btn)
}

function parseInfo() {
  inputLines.forEach((el) => {
    let firstletter = el.substr(0, 1);
    switch (firstletter) {
      case "C":
        game.zone = el.split("-");
        game.zone.shift();

        break;
      case "M":
        let m = el.split("-");
        m.shift();
        game.mountains.push(m);

        break;
        case "T":
          let t = el.split("-");
          t.shift();
          game.treasures.push(t);
  
          break;
          case "A":
            let a = el.split("-");
            let p = new Player(a[1],a[2],a[3],a[4],a[5])
            game.players.push(p);
    
            break;

      default:
        console.warn("La ligne " + el + " a été ignorée");
        break;
    }
  });
}

function formatInput() {
  console.info(inputTxt);

  inputTxt = inputTxt
    .replace(/ /g, "")
    .replace(/^#.*$/gm, "")
    .replace(/^[\n]/gm, "");

  inputLines = inputTxt.split("\n");
}
