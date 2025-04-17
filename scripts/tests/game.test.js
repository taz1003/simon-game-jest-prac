/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

jest.spyOn(window, "alert").mockImplementation(() => {}); // Mock the alert function

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
	test("turnNumber key exists", () => {
		expect("turnNumber" in game).toBe(true);
	});
    test("turnInProgress key exitsts", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    test("lastButton key exists", () => {
        expect("lastButton" in game).toBe(true);
    });
});

// beforeAll runs before all tests in the describe block and
// beforeEach runs before each test and
// afterEach runs after each test and
// afterAll runs after all tests.

describe("newGame works correctly", () => {
	// beforeAll because we want to reset the game before each test and see
	// if the game is reset correctly
	beforeAll(() => {
		game.currentGame = ["button1", "button2"];
		game.playerMoves = ["button1", "button2"];
		game.score = 42;
		document.getElementById("score").innerText = "42";
		newGame();
	});
	test("should set game score to 0", () => {
		expect(game.score).toEqual(0);
	});
	test("should be one move as element in the computer's game array", () => {
		// can also be written as ->
		// expect(game.currentGame.length).toEqual(1);
		// but this is more readable
		expect(game.currentGame.length).toBe(1);
	});
	test("should clear the playerMoves array", () => {
		expect(game.playerMoves).toEqual([]);
	});
	test("should set the element with the id of 'score' display to 0", () => {
		expect(document.getElementById("score").innerText).toEqual(0);
	});
	test("should set  the turnNumber to 0", () => {
		expect(game.turnNumber).toEqual(0);
	});
});

describe("gameplay works correctly", () => {
	beforeEach(() => {
		game.score = 0;
		game.currentGame = [];
		game.playerMoves = [];
		addTurn();
	});
	afterEach(() => {
		game.score = 0;
		game.currentGame = [];
		game.playerMoves = [];
	});
	test("expect data-listener to be true", () => {
		const elements = document.getElementsByClassName("circle");
		for (let element of elements) {
			expect(element.getAttribute("data-listener")).toEqual("true");
		}

		// addEventListener("click", () => {
		//     // let clickedButton = document.querySelectorAll(".circle");
		// 	// clickedButton.forEach((button) => {
		// 	// 	button.setAttribute("data-listener", "true");
		// 	// 	expect(button.getAttribute("data-listener")).toBe("true");
		//     // });

		// }) It was my code, now the Ci code is underneath:
	});

	test("adds a new turn to the game", () => {
		addTurn();
		expect(game.currentGame.length).toBe(2); // Assuming addTurn adds one element to currentGame
	});
	test("should add the correct class to light up the buttons", () => {
		let button = document.getElementById(game.currentGame[0]);
		lightsOn(game.currentGame[0]); // Light up the button that was clicked
		expect(button.classList).toContain("light"); // Assuming lightsOn adds the class "light" to the button
	});
	test("showTurns should update game.turnNumber", () => {
		game.turnNumber = 42;
		showTurns();
		expect(game.turnNumber).toBe(0); // Assuming showTurns resets the turn number to 0
	});
	// test("should increment the score if the turn is correct", () => {
	//     game.playerMoves.push(game.currentGame[0]); // Simulate a correct move
	//     playerTurn(); // Call the playerTurn function
	//     expect(game.score).toBe(1); // Assuming the score increments by 1 for a correct move
	// })
	test("should increment the score if the turn is correct", () => {
		game.playerMoves.push(game.currentGame[0]);
		playerTurn();
		expect(game.score).toBe(1);
	});
	test("should call an alert if the move is wrong", () => {
		game.playerMoves.push("wrong"); // Simulate a wrong move
		playerTurn(); // Call the playerTurn function
		expect(window.alert).toBeCalledWith("Wrong move!"); // Check if the alert was called with the correct message
	});
	test("check if the turnInProgress key is set to true", () => {
		showTurns(); // Call the showTurns function
		expect(game.turnInProgress).toBe(true); // Check if the turnInProgress key is set to false
	});
    test("clicking during the computer sequence should fail", () => {
        showTurns(); // Start the computer sequence
        game.lastButton = ""; // Reset the last button clicked
        document.getElementById("button2").click(); // Simulate a click on button2
        expect(game.lastButton).toBe(""); // Check if the last button clicked is still empty
    })
});
