"use strict";

// Manages the graphic part and contains a real time matrix with all board data
class Board {
  tblBody;
  playersDiv = [];

  /*P:land - M: mont - int:nbTreasure - [*,Obj] : player */
  matrix = [];

  constructor(game) {
    this.game = game;
  }

  generate() {
    this.createTable();
    this.createMountains();
    this.createTreasures();
    this.createPlayers();
  }

  //  Default all cells are land
  createTable() {
    var cont = document.getElementById("container");
    var tbl = document.createElement("table");
    this.tblBody = document.createElement("tbody");

    for (let i = 0; i < this.game.zone[2]; i++) {
      var row = document.createElement("tr");
      this.matrix.push([]);
      for (let j = 0; j < this.game.zone[1]; j++) {
        var cell = document.createElement("td");
        cell.setAttribute("class", "plaine");
        row.appendChild(cell);
        this.matrix[i].push("P");
      }
      this.tblBody.appendChild(row);
    }
    tbl.appendChild(this.tblBody);
    cont.appendChild(tbl);
  }

  createMountains() {
    this.game.mountains.forEach((el) => {
      this.getCell(el[1], el[2]).setAttribute("class", "montagne");
      this.matrix[el[2]][el[1]] = "M";
    });
  }
  createTreasures() {
    this.game.treasures.forEach((el) => {
      this.getCell(el[1], el[2]).textContent = "" + el[3];
      this.getCell(el[1], el[2]).setAttribute("class", "tresor");

      this.matrix[el[2]][el[1]] = el[3];
    });
  }

  // creation of a <div> for each player that can move then
  createPlayers() {
    var cont = document.getElementById("container");
    this.game.players.forEach((el) => {
      var div = document.createElement("div");
      cont.appendChild(div);
      div.setAttribute("class", "perso");
      Board.setPositionPlayer(div, el);
      this.playersDiv.push(div);

      this.matrix[el.j][el.i] = [this.matrix[el.j][el.i], el];
    });
  }

  updatePlayer(i) {
    let p = this.game.players[i];
    if (!!p.lastMove) {
      //update matrix
      this.matrix[p.oldj][p.oldi] = this.matrix[p.oldj][p.oldi][0];
      this.matrix[p.j][p.i] = [this.matrix[p.j][p.i], p];

      //Update treasures
      if (p.lastMove === "A" && parseInt(this.matrix[p.j][p.i][0]) > 0) {
        this.matrix[p.j][p.i][0]--;
        p.nbTreasures++;
        this.getCell(p.i, p.j).textContent = "" + this.matrix[p.j][p.i][0];
      }

      //Update graphic
      Board.setPositionPlayer(this.playersDiv[i], p);
    }
  }

  // return a graphical cell of the table
  getCell(i, j) {
    i = parseInt(i);
    j = parseInt(j);
    return this.tblBody.childNodes[j].childNodes[i];
  }

  //  calculus of div position
  static setPositionPlayer(div, player) {
    div.textContent =
      player.name.substring(0, 7) +
      "(" +
      player.sens +
      ";" +
      player.nbTreasures +
      ")";
    div.style.top = 4 + 89 * player.j + "px";
    div.style.left = 4 + 89 * player.i + "px";
  }
  static destroy() {
    var cont = document.getElementById("container");
    cont.innerHTML = "";
  }
}
