"use strict";

class Player {
  nbTreasures = 0;
  static ways = ["S", "O", "N", "E"];
  //old position
  oldi;
  oldj;
  lastMove = false; //or ADG

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
        console.error("error code 1337 :)");
        break;
    }
  }
  turnRight() {
    var i = Player.ways.indexOf(this.sens);
    this.sens = Player.ways[++i % 4];
  }
  turnLeft() {
    var i = Player.ways.indexOf(this.sens);
    this.sens = i ? Player.ways[--i % 4] : Player.ways[3];
  }
  //  plays the nth round
  playRound(n, isForwardPossible) {
    if (this.path.length <= n) {
      return;
    }
    this.oldi = this.i;
    this.oldj = this.j;
    this.lastMove = this.path[n];
    switch (this.path[n]) {
      case "A":
        if (isForwardPossible) this.moveForward();
        else this.lastMove = false;
        break;
      case "D":
        this.turnRight();
        break;
      case "G":
        this.turnLeft();
        break;

      default:
        console.error("Impossible to execute this movement :" + path[n]);
        break;
    }
  }
}
