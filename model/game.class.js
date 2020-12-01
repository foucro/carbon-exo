class Game {
  mountains = [];
  treasures = [];
  isValid = true;
  players = [];
  board;
  step = 0;
  stepMax; //TODO

  constructor(inputData) {
    Game.formatInput(inputData).forEach((el) => {
      let firstletter = el.substr(0, 1);
      switch (firstletter) {
        case "C":
          this.zone = el.split("-");
          this.zone.shift();

          break;
        case "M":
          let m = el.split("-");
          m.shift();
          this.mountains.push(m);

          break;
        case "T":
          let t = el.split("-");
          t.shift();
          this.treasures.push(t);

          break;
        case "A":
          let a = el.split("-");
          let p = new Player(a[1], a[2], a[3], a[4], a[5]);
          this.players.push(p);

          break;

        default:
          console.warn("La ligne " + el + " a été ignorée");
          break;
      }
    });
  }
  static formatInput(inputTxt) {
    inputTxt = inputTxt
      .replace(/ /g, "")
      .replace(/^#.*$/gm, "")
      .replace(/^[\n]/gm, "");

    return inputTxt.split("\n");
  }
  //verifie que les
  verifyData() {
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
      player.playRound(this.step, true);
    });
    this.board.updatePlayers();

    this.step++;
  }
}
