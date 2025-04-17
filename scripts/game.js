let game = {
	score: 0,
	currentGame: [],
	playerMoves: [],
	choices: ["button1", "button2", "button3", "button4"],
	turnNumber: 0,
	turnInProgress: false,
	lastButton: "", // Store the last clicked button
};

function newGame() {
	game.score = 0;
	game.playerMoves = [];
	game.currentGame = [];
	game.turnNumber = 0;
	for (let circle of document.getElementsByClassName("circle")) {
		if (circle.getAttribute("data-listener") !== "true") {
			circle.addEventListener("click", (e) => {
				if (game.currentGame.length > 0 && !game.turnInProgress) {
					// Check if the game has started and we allow the click if the game is not in pregress
					let move = e.target.getAttribute("id"); // Get the id of the clicked button
					game.lastButton = move; // Store the last clicked button
					lightsOn(move); // Light up the clicked button
					game.playerMoves.push(move); // Add the move to the player's moves
					playerTurn();
				} // Check if the game has started before allowing player moves
			});
			circle.setAttribute("data-listener", "true"); // Set the data-listener attribute to true
		}
	}
	showScore();
	addTurn();
}

function showScore() {
	document.getElementById("score").innerText = game.score;
}

function addTurn() {
	game.playerMoves = []; // Clear the player's moves for the new turn
	// Add a random choice to the current game
	game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]);
	showTurns();
}

function lightsOn(circle) {
	document.getElementById(circle).classList.add("light");
	setTimeout(() => {
		document.getElementById(circle).classList.remove("light");
	}, 400);
}

function showTurns() {
	game.turnInProgress = true; // Set the flag to indicate a turn is in progress
	game.turnNumber = 0; // Reset the turn number to 0
	let turn = setInterval(() => {
		lightsOn(game.currentGame[game.turnNumber]); // Light up the current button
		game.turnNumber++; // Increment the turn number
		if (game.turnNumber >= game.currentGame.length) {
			clearInterval(turn); // Stop the interval when all turns are shown
			game.turnInProgress = false; // Reset the flag to indicate the turn is complete
		}
	}, 800); // Adjust the timing as needed

	// Loop through the current game and light up each button in sequence
	// game.currentGame.forEach((circle, index) => {
	//     setTimeout(() => {
	//         lightsOn(circle);
	//     }, index * 800); // Adjust the timing as needed
	// });
}

// function playerTurn() {
// 	// if (game.playerMoves.length === game.currentGame.length) {
// 	//     if (JSON.stringify(game.playerMoves) === JSON.stringify(game.currentGame)) {
// 	//         game.score++; // Increment the score if the player's moves match the current game
// 	//         showScore();
// 	//         addTurn(); // Add a new turn after a successful match
// 	//     } else {
// 	//         alert("Wrong move! Game over."); // Alert the player if they made a wrong move
// 	//         newGame(); // Restart the game
// 	//     }
// 	// }
// }

function playerTurn() {
	let i = game.playerMoves.length - 1; // Get the index of the last move made by the player
	if (game.currentGame[i] === game.playerMoves[i]) {
		// Check if the last move is correct
		if (game.currentGame.length === game.playerMoves.length) {
			// Check if all moves are correct
			game.score++;
			showScore();
			addTurn(); // Add a new turn after a successful match
		}
	} else {
		alert("Wrong move!"); // Alert the player if they made a wrong move
		newGame(); // Restart the game
	}
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };
