class Game {
  zone = [];
  mountains = [];
  treasures = [];
  isValid = true;
  players = [];
  board;
  step = 0;
  stepMax//TODO

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

class Player {
  i = 0;
  j = 0;
  nbTreasures = 0;
  name = "";
  sens = "";
  path = "";
  static ways = ["S", "O", "N", "E"];
  constructor(name, i, j, sens, path) {
    this.name = name;
    this.i = parseInt(i);
    this.j = parseInt(j);
    this.sens = sens;
    this.path = path;
  }
  moveForward() {
    switch (this.sens) {
      case "N":
        this.j--;
        break;
      case "S":
        this.j++;
        break;
      case "O":
        this.i--;
        break;
      case "E":
        this.i++;
        break;

      default:
        console.error("error code 5451");
        break;
    }
  }
  turnRight() {
    var i = Player.ways.indexOf(this.sens);
    this.sens = Player.ways[++i % 4];
  }
  turnLeft() {
    var i = Player.ways.indexOf(this.sens);
    this.sens = Player.ways[--i % 4];
  }
  playRound(i, isForwardPossible) {
    switch (this.path[i]) {
      case "A":
        if (isForwardPossible) this.moveForward();
        break;
      case "D":
        this.turnRight();
        break;
      case "G":
        this.turnLeft();
        break;

      default:
        console.error("Mouvement " + path[i] + " impossible !");
        break;
    }
  }
}

class Board {
  game = new Game();
  tblBody;
  playersDiv = [];

  constructor(game) {
    this.game = game;
  }

  generate() {
    this.createTable();
    this.createMountains();
    this.createTreasures();
    this.createPlayers();
  }

  updatePlayers() {
      for (let i = 0; i < this.playersDiv.length; i++) {
        Board.positionPlayer(this.playersDiv[i],this.game.players[i]);          
      }
  }
    createPlayers() {
    var cont = document.getElementById("container");
    this.game.players.forEach((el) => {
      var div = document.createElement("div");
      cont.appendChild(div);
      div.setAttribute("class", "perso");
      Board.positionPlayer(div,el)
      this.playersDiv.push(div);
    });
  }
static positionPlayer(div,player){

    div.textContent = player.name + "(" + player.sens + ")";
    div.style.top = 4 + 89 * player.j + "px";
    div.style.left = 4 + 89 * player.i + "px";
}
  createTable() {
    var cont = document.getElementById("container");
    var tbl = document.createElement("table");

    this.tblBody = document.createElement("tbody");

    for (var i = 0; i < this.game.zone[1]; i++) {
      var row = document.createElement("tr");

      for (var j = 0; j < this.game.zone[0]; j++) {
        var cell = document.createElement("td");
        cell.setAttribute("class", "plaine");
        row.appendChild(cell);
      }

      this.tblBody.appendChild(row);
    }

    tbl.appendChild(this.tblBody);
    cont.appendChild(tbl);
  }

  createMountains() {
    this.game.mountains.forEach((el) => {
      this.getCell(el[0], el[1]).setAttribute("class", "montagne");
    });
  }
  createTreasures() {
    this.game.treasures.forEach((el) => {
      this.getCell(el[0], el[1]).textContent = "T" + el[2];
      this.getCell(el[0], el[1]).setAttribute("class", "tresor");
    });
  }

  getCell(i, j) {
    i = parseInt(i);
    j = parseInt(j);
    return this.tblBody.childNodes[j].childNodes[i];
  }
}
