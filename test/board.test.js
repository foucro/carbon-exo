(function () {
  "use strict";

  /*
     =========  TEST BOARD  ============
*/
  createTestSection("BOARD CREATION");

  let data = {
    zone: ["C", 3, 5],
    players: [
      {
        nbTreasures: 0,
        lastMove: false,
        name: "Lara",
        i: 1,
        j: 1,
        sens: "S",
        path: "AADADAGGA",
      },
    ],
    mountains: [
      ["M", 1, 0],
      ["M", 2, 1],
    ],
    treasures: [
      ["T", 0, 3, 2],
      ["T", 1, 3, 3],
    ],
  };

  let board = new Board(data);

  it("Must create a board", function () {
    if (!isEqual(data, board.game)) throw new Error("Board creation fail");
  });

  board.generate();

  it("Must create graphic table", function () {
    if (board.tblBody.childNodes.length !== data.zone[2])
      throw new Error("wrong row number");
    if (board.tblBody.childNodes[0].childNodes.length !== data.zone[1])
      throw new Error("wrong column number");
  });

  it("Must add classes to cells", function () {
    if (!board.getCell(1, 0).classList.contains("montagne"))
      throw new Error("should add class 'montagne'");
    if (!board.getCell(1, 1).classList.contains("plaine"))
      throw new Error("should add class 'plaine'");
    if (!board.getCell(1, 3).classList.contains("tresor"))
      throw new Error("should add class 'tresor'");
  });

  it("Must create players div", function () {
    if (
      document.getElementsByClassName("perso")?.length !==
        board.game.players.length ||
      board.playersDiv.length !== board.game.players.length
    )
      throw new Error("should create a div for each player");
  });

  it("Must create a representative matrix", function () {
    if (
      board.matrix.length !== board.game.zone[2] ||
      board.matrix[0].length !== board.game.zone[1]
    )
      throw new Error("wrong matrix size");

    if ("P" !== board.matrix[0][0]) throw new Error("default should be 'P'");
    if ("M" !== board.matrix[1][2]) throw new Error("mountain should be 'M'");
    if (3 !== board.matrix[3][1])
      throw new Error("treasure should be an integer of remaining ones");
    if (!isEqual(board.matrix[1][1][1], board.game.players[0]))
      throw new Error("players must be added in an array");

    let m = [
      ["P", "M", "P"],
      ["P", ["P", board.game.players[0]], "M"],
      ["P", "P", "P"],
      [2, 3, "P"],
      ["P", "P", "P"],
    ];
    if (!isEqual(m, board.matrix))
      throw new Error("should create a representative matrix");
  });

  createTestSection("BOARD UPDATE");

  it("Must update player position", function () {
    board.game.players[0] = {
      nbTreasures: 0,
      lastMove: "A",
      name: "Lara",
      i: 2,
      j: 2,
      sens: "S",
      path: "AADADAGGA",
      oldi: 1,
      oldj: 1,
    };
    board.updatePlayer(0);
    if (
      board.matrix[1][1] !== "P" ||
      !isEqual(board.matrix[2][2], ["P", board.game.players[0]])
    )
      throw new Error("should update matrix");
  });

  it("Must update treasure", function () {
    board.game.players[0] = {
      nbTreasures: 0,
      lastMove: "A",
      name: "Lara",
      i: 0,
      j: 3,
      sens: "S",
      path: "AADADAGGA",
      oldi: 2,
      oldj: 2,
      nbTreasures: 4,
    };
    board.updatePlayer(0);
    if (board.matrix[3][0][0] !== 1 || board.game.players[0].nbTreasures !== 5)
      throw new Error("should update treasure");

    board.game.players[0] = {
      nbTreasures: 0,
      lastMove: "O",
      name: "Lara",
      i: 0,
      j: 3,
      sens: "S",
      path: "AADADAGGA",
      oldi: 0,
      oldj: 3,
      nbTreasures: 4,
    };
    board.updatePlayer(0);
    if (board.matrix[3][0][0] !== 1 || board.game.players[0].nbTreasures !== 4)
      throw new Error("should not update treasure if player does not move");
  });
})();
