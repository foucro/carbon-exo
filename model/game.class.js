"use strict";

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

  //checks data and fill board data
  constructor(inputData) {
    Game.formatInput(inputData).forEach((el) => {
      let firstletter = el.substr(0, 1);
      switch (firstletter) {
        //   MAP
        case "C":
          this.boardData.zone = el.split("-").map((x) => parseInt(x) || x);
          if (
            this.boardData.zone.length != 3 ||
            isNaN(this.boardData.zone[1]) ||
            isNaN(this.boardData.zone[2])
          ) {
            this.isValid = false;
            console.error("Board dimension not defined");
            return;
          }
          break;

        // MOUNTAINS
        case "M":
          let m = el.split("-").map((x) => (Game.isNum(x) ? parseInt(x) : x));
          if (isNaN(m[2]) || isNaN(m[1]) || this.isOut(m[1], m[2])) {
            console.warn("Line '" + el + "' has been skipped");
            return;
          }
          this.boardData.mountains.push(m);
          break;

        //   TREASURES
        case "T":
          let t = el.split("-").map((x) => (Game.isNum(x) ? parseInt(x) : x));
          if (
            isNaN(t[3]) ||
            isNaN(t[1]) ||
            isNaN(t[2]) ||
            this.isOut(t[1], t[2])
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

  generateBoard() {
    this.board = new Board(this.boardData);
    this.board.generate();
  }

  //Plays one more round
  nextStep() {
    this.boardData.players.forEach((player, i) => {
      if (player.path.length > this.step) {
        player.playRound(this.step, this.canGoForward(player));
        this.board.updatePlayer(i);
        if (player.path.length - 1 === this.step)
          console.info(player.name + " has completed his path.");
      } else if (player.path.length === this.step) player.lastMove = false;
    });
    if (this.stepMax == ++this.step) {
      this.finish();
      return;
    }
  }

  //Displays final output and creates a download btn
  finish() {
    let out = this.getOutput();
    if (this.loop) clearInterval(this.loop);
    document.getElementById("outContainer").style.display = "block";
    document.getElementById("output").textContent = out;
    let title =
      "###############################\n##          Results          ##\n###############################\n";
    let data = new Blob([title, out], { type: "text/plain" });
    let textFile = window.URL.createObjectURL(data);

    document.getElementById("download").href = textFile;

    window.scrollTo(0, document.body.scrollHeight);
  }

  //plays all rounds until the end with an interval
  allSteps(ms) {
    if (!ms) ms = 700;
    this.nextStep();
    this.loop = setInterval.call(this, this.nextStep, parseInt(ms));
  }

  //checks if a player can move forward
  canGoForward(player) {
    let sim = new Player();
    Object.assign(sim, player);
    sim.moveForward();

    if (this.isOut([sim.i], [sim.j])) {
      //console.info("Player " + player.name + " faces the border");
      return false;
    }
    if (
      this.board.matrix[sim.j][sim.i] !== "P" &&
      isNaN(this.board.matrix[sim.j][sim.i])
    ) {
      //console.info("Player " + player.name + " faces a mountain or a player");
      return false;
    }
    return true;
  }

  //   builds the final ouptut text
  getOutput() {
    let out = this.boardData.zone.join(" - ") + "\n";
    this.boardData.mountains.forEach((m) => {
      out += m.join(" - ") + "\n";
    });
    this.boardData.treasures.forEach((t) => {
      t.pop();
      out += t.join(" - ") + " - ";
      let nb = isNaN(this.board.matrix[t[2]][t[1]])
        ? this.board.matrix[t[2]][t[1]][0]
        : this.board.matrix[t[2]][t[1]];
      out += nb + "\n";
    });
    this.boardData.players.forEach((p) => {
      out +=
        "A - " +
        p.name +
        " - " +
        p.i +
        " - " +
        p.j +
        " - " +
        p.sens +
        " - " +
        p.nbTreasures +
        "\n";
    });
    return out;
  }

  //checks if item is out of bounds
  isOut(i, j) {
    return (
      i < 0 ||
      j < 0 ||
      i >= this.boardData.zone[1] ||
      j >= this.boardData.zone[2]
    );
  }

  //Checks if there is an int in str
  static isNum(str) {
    return !isNaN(parseInt(str));
  }

  //removes space and returns an array with the lines
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
