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
    console.log(this.matrix)
  }

  updatePlayers() {
    for (let i = 0; i < this.playersDiv.length; i++) {
        let p = this.game.players[i]
      Board.setPositionPlayer(this.playersDiv[i], p);

      if(!!p.lastMove)
        this.matrix[p.j][p.i]= [this.matrix[p.j][p.i],p]
        if('A'===p.lastMove)
          this.matrix[p.oldj][p.oldi]= this.matrix[p.oldj][p.oldi][0]
    }
    console.log(this.matrix)
  }
  createPlayers() {
    var cont = document.getElementById("container");
    this.game.players.forEach((el) => {
      var div = document.createElement("div");
      cont.appendChild(div);
      div.setAttribute("class", "perso");
      Board.setPositionPlayer(div, el);
      this.playersDiv.push(div);

      this.matrix[el.j][el.i] = [this.matrix[el.j][el.i],el]
    });
  }
  static setPositionPlayer(div, player) {
    div.textContent = player.name + "(" + player.sens + ")";
    div.style.top = 4 + 89 * player.j + "px";
    div.style.left = 4 + 89 * player.i + "px";
  }
  static destroy(){
    var cont = document.getElementById("container");
    cont.innerHTML = '';
  }
  createTable() {
    var cont = document.getElementById("container");
    var tbl = document.createElement("table");

    this.tblBody = document.createElement("tbody");

    for (let i = 0; i < this.game.zone[1]; i++) {
      var row = document.createElement("tr");
    this.matrix.push([]);

      for (let j = 0; j < this.game.zone[0]; j++) {
        var cell = document.createElement("td");
        cell.setAttribute("class", "plaine");
        row.appendChild(cell);
        this.matrix[i].push('P');
      }

      this.tblBody.appendChild(row);
    }

    tbl.appendChild(this.tblBody);
    cont.appendChild(tbl);
  }

  createMountains() {
    this.game.mountains.forEach((el) => {
      this.getCell(el[0], el[1]).setAttribute("class", "montagne");
      this.matrix[el[1]][el[0]] = 'M'
    });
  }
  createTreasures() {
    this.game.treasures.forEach((el) => {
      this.getCell(el[0], el[1]).textContent = "" + el[2];
      this.getCell(el[0], el[1]).setAttribute("class", "tresor");

      this.matrix[el[1]][el[0]] = el[2]
    });
  }

  getCell(i, j) {
    i = parseInt(i);
    j = parseInt(j);
    return this.tblBody.childNodes[j].childNodes[i];
  }
}
