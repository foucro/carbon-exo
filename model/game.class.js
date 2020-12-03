//Manages the Game
class Game {
  boardData = {
    zone: [],
    players: [],
    mountains: [],
    treasures: [],
  };

  isValid = true;
  board;
  step = 0;
  stepMax = 0;
  loop;

  //check data and fill board data
  constructor(inputData) {
    Game.formatInput(inputData).forEach((el) => {
      let firstletter = el.substr(0, 1);
      switch (firstletter) {
        //   MAP
        case "C":
          this.boardData.zone = el.split("-").map((x) => parseInt(x));
          this.boardData.zone.shift();
          if (
            this.boardData.zone.length != 2 ||
            isNaN(this.boardData.zone[0]) ||
            isNaN(this.boardData.zone[1])
          ) {
            this.isValid = false;
            console.error("Board dimension not defined");
            return;
          }
          break;

        // MOUNTAINS
        case "M":
          let m = el.split("-").map((x) => parseInt(x));
          m.shift();
          if (isNaN(m[0]) || isNaN(m[1]) || this.isOut(m[0], m[1])) {
            console.warn("Line '" + el + "' has been skipped");
            return;
          }
          this.boardData.mountains.push(m);
          break;

        //   TREASURES
        case "T":
          let t = el.split("-").map((x) => parseInt(x));
          t.shift();
          if (
            isNaN(t[0]) ||
            isNaN(t[1]) ||
            isNaN(t[2]) ||
            this.isOut(t[0], t[1])
          ) {
            console.warn("Line '" + el + "' has been skipped");
            return;
          }
          this.boardData.treasures.push(t);
          break;

        //   PLAYERS
        case "A":
          let a = el.split("-");
          if (
            a.length != 6 ||
            !Game.isNum(a[2]) ||
            !Game.isNum(a[3]) ||
            Player.ways.indexOf(a[4]) == -1 ||
            this.isOut(parseInt(a[2]), parseInt(a[3]))
          ) {
            console.warn("Line '" + el + "' has been skipped");
            return;
          }
          let p = new Player(a[1], parseInt(a[2]), parseInt(a[3]), a[4], a[5]);
          if (this.stepMax < a[5].length) this.stepMax = a[5].length;
          this.boardData.players.push(p);
          break;

        default:
          console.warn("Line '" + el + "' has been skipped");
          break;
      }
    });

    if (!this.boardData.treasures.length || !this.boardData.players.length) {
      console.error("Lack of player or treasure");
      this.isValid = false;
    }
  }

  //check if item is out of bounds
  isOut(i, j) {
    return (
      i < 0 ||
      j < 0 ||
      i >= this.boardData.zone[0] ||
      j >= this.boardData.zone[1]
    );
  }

  generateBoard() {
    this.board = new Board(this.boardData);
    this.board.generate();
  }

  //Play one more round
  nextStep() {
    this.boardData.players.forEach((player) => {
      player.playRound(this.step, this.canGoForward(player));
    });
    this.board.updatePlayers();
    if (this.loop && this.stepMax == this.step) {
      clearInterval(this.loop);
      return;
    }
    this.step++;
  }

  //play all rounds until the end
  allSteps() {
    this.nextStep();
    this.loop = setInterval.call(
      this,
      this.nextStep,
      this.players.length * 1000
    );
  }

  //check if a player can move forward
  canGoForward(player) {
    let sim = new Player();
    Object.assign(sim, player);
    sim.moveForward();

    if (this.isOut([sim.i],[sim.j])) {
      console.info("Player " + player.name + " faces the border");
      return false;
    }
    if (
      this.board.matrix[sim.j][sim.i] !== "P" &&
      isNaN(this.board.matrix[sim.j][sim.i])
    ) {
      console.info("Player " + player.name + " faces a mountain or a player");
      return false;
    }
      return true;
    }
  

  //Check if there is an int in str
  static isNum(str) {
    return !isNaN(parseInt(str));
  }

  //remove space and return an array with the lines
  static formatInput(inputTxt) {
    inputTxt = inputTxt
      .replace(/ /g, "")
      .replace(/^#.*$/gm, "")
      .replace(/^[\n]/gm, "");

    return inputTxt.split("\n");
  }
}

//------Workaround to make interval work-------
var __nativeSI__ = window.setInterval;
window.setInterval = function (vCallback, nDelay) {
  var oThis = this,
    aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeSI__(
    vCallback instanceof Function
      ? function () {
          vCallback.apply(oThis, aArgs);
        }
      : vCallback,
    nDelay
  );
};
