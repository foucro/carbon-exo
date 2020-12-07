(function () {
  "use strict";

  /*
     =========  TEST CREATION  ============
*/
  createTestSection("GAME CREATION FROM DATA");

  it("Must extract size", function () {
    let data = "C-4-5";
    let game = new Game(data);
    if (!isEqual(game.boardData.zone, ["C", 4, 5]))
      throw new Error("Parsing failure");

    data = "C-4kl-5";
    game = new Game(data);
    if (!isEqual(game.boardData.zone, ["C", 4, 5]))
      throw new Error("wrong integer parse");

    data = "C-kl-5";
    game = new Game(data);
    if (game.isValid) throw new Error("should only accept numbers");

    data = "T-1-2-3\nA - Lara - 1 - 3 - E - 3";
    game = new Game(data);
    if (game.isValid) throw new Error("size is mandatory");
  });

  it("Must extract mountains", function () {
    let data = "C-4-5 \nM-0-2";
    let game = new Game(data);
    if (!isEqual(game.boardData.mountains, [["M", 0, 2]]))
      throw new Error("Parsing failure");

    data = "C-4-5 \n M-5-5";
    game = new Game(data);
    if (!isEqual(game.boardData.mountains, []))
      throw new Error("shoud skip mountains out of bounds");

    data = " C-4-5 \nM-jk-4";
    game = new Game(data);
    if (!isEqual(game.boardData.mountains, []))
      throw new Error("should only accept numbers");

    data = "C-4-5 \nM-0-3\n M-3-3";
    game = new Game(data);
    if (
      !isEqual(game.boardData.mountains, [
        ["M", 0, 3],
        ["M", 3, 3],
      ])
    )
      throw new Error("shoud stack all the montains");
  });

  it("Must extract treasures", function () {
    let data = "C-4-5 \nT-1-2-3";
    let game = new Game(data);
    if (!isEqual(game.boardData.treasures, [["T", 1, 2, 3]]))
      throw new Error("Parsing failure");

    data = "C-4-5 \nT-jk-4-6";
    game = new Game(data);
    if (!isEqual(game.boardData.treasures, []))
      throw new Error("should only accept numbers");

    data = "C-4-5 \n T-5-5-3";
    game = new Game(data);
    if (!isEqual(game.boardData.treasures, []))
      throw new Error("shoud skip mountains out of bounds");
    data = "C-4-5 \nT-1-2-3\n T-3-1-3";
    game = new Game(data);
    if (
      !isEqual(game.boardData.treasures, [
        ["T", 1, 2, 3],
        ["T", 3, 1, 3],
      ])
    )
      throw new Error("shoud stack all the treasures");
  });

  it("Must extract players", function () {
    let data = "C-4-5 \nA - Lara - 1 -3- E - DADADDGD";
    let game = new Game(data);
    let p = game.boardData.players[0];
    if (
      p.name !== "Lara" ||
      p.i !== 1 ||
      p.j !== 3 ||
      p.sens !== "E" ||
      p.path !== "DADADDGD"
    )
      throw new Error("Parsing failure");

    data = "C-4-5 \nA - Lara - 5 -3- E - DADADDGD";
    game = new Game(data);
    if (!isEqual(game.boardData.treasures, []))
      throw new Error("shoud skip players out of bounds");

    data = "C-4-5 \nA - Lara - 0 -3- M - DADADDGD";
    game = new Game(data);
    if (!isEqual(game.boardData.treasures, []))
      throw new Error("shoud skip player with wrong orientation");

    data = "C-4-5 \nA - Lara - 0 -3-O- DGGGDDGD\nA - ghg - 0 -3- O - DADADDGD";
    game = new Game(data);
    if (game.boardData.players.length != 2)
      throw new Error("shoud stack all the players");
  });

  it("Must check data", function () {
    let data = "C-4-5 \nT-1-2-3\nA - Lara - 1 -3- E - DADADDGD";
    let game = new Game(data);
    if (!game.isValid) throw new Error("Parsing failure");
    data = "C-4-5 \nA - Lara - 1 -3- E - DADADDGD";
    game = new Game(data);
    if (game.isValid)
      throw new Error("Game must not start without any treasure");
    data = "C-4-5 \nT-1-2-3";
    game = new Game(data);
    if (game.isValid)
      throw new Error("Game must not start without any players");
  });

  /*
     =========  TEST OUTPUT  ============
*/
  createTestSection("GAME MANAGEMENT & OUTPUT");

  let game = new Game("");
  game.board = new Board();
  game.boardData = {
    zone: ["C", 3, 5],
    players: [new Player("Lara", 1, 1, "S", "AADADAGGA")],
    mountains: [
      ["M", 1, 0],
      ["M", 2, 1],
    ],
    treasures: [
      ["T", 0, 3, 5],
      ["T", 1, 3, 3],
    ],
  };
  game.boardData.players[0].nbTreasures = 3;
  game.board.matrix = [
    ["P", "M", "P"],
    ["P", ["P", game.boardData.players[0]], "M"],
    ["P", "P", "P"],
    [2, 1, "P"],
    ["P", "P", "P"],
  ];
  it("Must generate an output text", function () {
    let out = game.getOutput();
    if (
      !out.includes("C - 3 - 5") ||
      !out.includes("M - 1 - 0") ||
      !out.includes("M - 2 - 1") ||
      !out.includes("T - 0 - 3 - 2") ||
      !out.includes("T - 1 - 3 - 1") ||
      !out.includes("A - Lara - 1 - 1 - S - 3")
    )
      throw new Error("wrong output");
  });
})();
