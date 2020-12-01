
class Board {
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
  