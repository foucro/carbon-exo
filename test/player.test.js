(function () {
  "use strict";

  /*
     =========  TEST PLAYER  ============
*/
  createTestSection("PLAYER MOVEMENTS");

  let player = new Player("Romain", 1, 2, "N", "AAAGDGADG");

  it("Must move forward", function () {
    player.moveForward();
    if (player.i !== 1 || player.j !== 1)
      throw new Error("wrong forward movement");

    player.sens = "O";
    player.moveForward();
    if (player.i !== 0 || player.j !== 1)
      throw new Error("wrong forward movement");
  });

  player = new Player("Romain", 1, 2, "N", "AAAGDGADG");
  it("Must turn right", function () {
    player.turnRight();
    if (player.sens !== "E") throw new Error("wrong right movement");
    player.turnRight();
    if (player.sens !== "S") throw new Error("wrong right movement");
  });

  player = new Player("Romain", 1, 2, "N", "AAAGDGADG");
  it("Must turn left", function () {
    player.turnLeft();
    if (player.sens !== "O") throw new Error("wrong left movement");
    player.turnLeft();
    if (player.sens !== "S") throw new Error("wrong left movement");
  });

  player = new Player("Romain", 1, 2, "N", "AAAGDGADG");
  it("Must play a specific round", function () {
    player.playRound(0, false);
    if (player.i !== 1 || player.j !== 2 || player.sens !== "N")
      throw new Error("must not move if it is not possible");
    player.playRound(0, true);
    if (player.i !== 1 || player.j !== 1 || player.sens !== "N")
      throw new Error("wrong round movement");

    player.playRound(5, false);
    if (player.i !== 1 || player.j !== 1 || player.sens !== "O")
      throw new Error("wrong round movement");
  });

  player = new Player("Romain", 1, 2, "N", "AAAGDGADG");
  it("Must save move and old position", function () {
    player.playRound(0, true);
    if (player.oldi !== 1 || player.oldj !== 2 || player.lastMove !== "A")
      throw new Error("must save old position");
    player.playRound(0, false);
    if (player.oldi !== 1 || player.oldj !== 1 || player.lastMove !== false)
      throw new Error("must save old position");
  });
})();
