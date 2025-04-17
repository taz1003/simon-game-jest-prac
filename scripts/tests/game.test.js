/**
 * @jest-environment jsdom
 */

const { game, newGame } = require("../game");

beforeAll(() => {
	let fs = require("fs");
	let fileContents = fs.readFileSync("index.html", "utf-8");
	document.open();
	document.write(fileContents);
	document.close();
});

describe("game object contains correct keys", () => {
	test("score key exists", () => {
		expect("score" in game).toBe(true);
	});
	test("currentGame key exists", () => {
		expect("currentGame" in game).toBe(true);
	});
	test("playerMoves key exists", () => {
		expect("playerMoves" in game).toBe(true);
	});
	test("choices key exists", () => {
		expect("choices" in game).toBe(true);
	});
	test("choices contain the correct ids", () => {
		expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
	});
});

describe("newGame works correctly", () => {
	// beforeAll because we want to reset the game before each test and see
	// if the game is reset correctly
	beforeAll(() => {
		game.currentGame = ["button1", "button2"];
		game.playerMoves = ["button1", "button2"];
		game.score = 42;
		newGame();
	});
	test("should set game score to 0", () => {
		expect(game.score).toEqual(0);
	});
	test("should clear the playerMoves array", () => {
		expect(game.playerMoves).toEqual([]);
	});
	test("should clear the playerMoves array", () => {
        // can also be written as ->
        // expect(game.playerMoves).toEqual([]);
		expect(game.playerMoves.length).toBe(0);
	});
});