class Game {
  mountains = [];
  treasures = [];
  isValid = true;
  players = [];
  board;
  step = 0;
  stepMax = 0;
  loop;

  constructor(inputData) {
    Game.formatInput(inputData).forEach((el) => {
      let firstletter = el.substr(0, 1);
      switch (firstletter) {
        case "C":
          this.zone = el.split("-");
          this.zone.shift();
          if (!Game.isNum(this.zone[0]) || !Game.isNum(this.zone[1])) {
            this.isValid = false;
            console.error("Board dimension not defined");
            return;
          }

          break;
        case "M":
          let m = el.split("-");
          m.shift();
          if (!Game.isNum(m[0]) || !Game.isNum(m[1])) {
            console.warn("Line '" + el + "' has been skipped");
            return;
          }
          this.mountains.push(m);

          break;
        case "T":
          let t = el.split("-");
          t.shift();
          if (!Game.isNum(t[0]) || !Game.isNum(t[1]) || !Game.isNum(t[2])) {
            console.warn("Line '" + el + "' has been skipped");
            return;
          }
          this.treasures.push(t);

          break;
        case "A":
          let a = el.split("-");
          if (
            a.length != 6 ||
            !Game.isNum(a[2]) ||
            !Game.isNum(a[3]) ||
            Player.ways.indexOf(a[4]) == -1
          ) {
            console.warn("Line '" + el + "' has been skipped");
            return;
          }
          let p = new Player(a[1], a[2], a[3], a[4], a[5]);
          if (this.stepMax < a[5].length) this.stepMax = a[5].length;
          this.players.push(p);

          break;

        default:
          console.warn("Line '" + el + "' has been skipped");
          break;
      }
    });

    this.verifyData();
  }

  static isNum(str) {
    return !isNaN(parseInt(str));
  }

  static formatInput(inputTxt) {
    inputTxt = inputTxt
      .replace(/ /g, "")
      .replace(/^#.*$/gm, "")
      .replace(/^[\n]/gm, "");

    return inputTxt.split("\n");
  }
  
  verifyData() {
    if (this.zone?.length != 2) {
      this.isValid = false;
      console.error("Board dimension not defined");
      return;
    }

    if (!this.treasures?.length || !this.players?.length) {
      console.error("Lack of data");
      this.isValid = false;
    }

    //FIXME
    this.mountains.forEach((e) => {
      if (e[0] >= this.zone[0] || e[1] >= this.zone[1]) {
        console.error("Montain out of bound");
        this.isValid = false;
      }
    });
    this.treasures.forEach((e) => {
      if (e[0] >= this.zone[0] || e[1] >= this.zone[1]) {
        console.error("Treasure out of bound");
        this.isValid = false;
      }
    });
    this.players.forEach((e) => {
      if (e.i >= this.zone[0] || e.j >= this.zone[1]) {
        console.error(e.name + " out of bound");
        this.isValid = false;
      }
    });
  }
  generateBoard() {
    this.board = new Board(this);
    this.board.generate();
  }

  nextStep() {
    this.players.forEach((player) => {
      player.playRound(this.step, this.canGoForward(player));
    });
    this.board.updatePlayers();

    if (this.stepMax == this.step) {
      clearInterval(this.loop);
      return;
    }
    this.step++;
  }

  allSteps() {
    this.nextStep();
    this.loop = setInterval.call(
      this,
      this.nextStep,
      this.players.length * 1000
    );
  }

  canGoForward(player) {
    let sim = new Player();
    Object.assign(sim, player);

    sim.moveForward();

    if (
      sim.i < 0 ||
      sim.j < 0 ||
      sim.i > this.zone[0] - 1 ||
      sim.j > this.zone[1] - 1
    ) {
      console.info("Player " + player.name + " faces the border");
      return false;
    }

    this.mountains.forEach((m) => {
      if (m[0] == sim.i && m[1] == sim.j) {
        console.info("Player " + player.name + " faces a mountain");
        return false;
      }
    });
    this.players.forEach((p) => {
      if (p.i == sim.i && p.j == sim.j) {
        console.info("Player " + player.name + " faces player" + p.name);
        return false;
      }
    });

    return true;
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
