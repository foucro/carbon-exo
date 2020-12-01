
class Player {
    nbTreasures = 0;
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
          console.error("error code 5451 :)");
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
  