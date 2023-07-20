const Model = (() => {
	const gameBoard = (() => {
		let availSpot;
		const init = function () {
			availSpot = [];
			for (let i = 1; i < 4; i++) {
				for (let j = 1; j < 4; j++) {
					availSpot.push(`r${i}c${j}`);
				}
			}
		};

		const getAvailSpot = () => availSpot;
		const setAvailSpot = (avail) => (availSpot = avail);

		// Include the 'play' function in the returned object.
		return { init, getAvailSpot, setAvailSpot };
	})();

	const playerFactory = function () {
		let playedSpot = [];
		const getPlayedSpot = () => playedSpot;
		const play = (position) => {
			let avail = gameBoard.getAvailSpot(); // No need to use Model.gameBoard here
			let index = avail.indexOf(position);
			if (index !== -1) {
				avail.splice(index, 1);
				gameBoard.setAvailSpot(avail); // No need to use Model.gameBoard here
				playedSpot.push(position);
				return true;
			} else {
				console.log(
					"Invalid move. Position is already taken or doesn't exist."
				);
				return false;
			}
		};
		const checkForCol = function () {
			let winPattern = [
				["r1c1", "r2c1", "r3c1"],
				["r1c2", "r2c2", "r3c2"],
				["r1c3", "r2c3", "r3c3"],
			];

			return winPattern.some((pattern) =>
				pattern.every((position) => playedSpot.includes(position))
			);
		};

		const checkForRow = function () {
			let winPattern = [
				["r1c1", "r1c2", "r1c3"],
				["r2c1", "r2c2", "r2c3"],
				["r3c1", "r3c2", "r3c3"],
			];

			return winPattern.some((pattern) =>
				pattern.every((position) => playedSpot.includes(position))
			);
		};

		const checkForDiag = function () {
			let winPattern = [
				["r1c1", "r2c2", "r3c3"],
				["r3c1", "r2c2", "r1c3"],
			];

			return winPattern.some((pattern) =>
				pattern.every((position) => playedSpot.includes(position))
			);
		};

		return {
			getPlayedSpot,
			play,
			checkForCol,
			checkForDiag,
			checkForRow,
			winner: false,
		};
	};

	let player1;
	let player2;

	const init = function () {
		// Change to a regular function expression
		gameBoard.init();
		this.player1 = playerFactory(); // 'this' will refer to the 'Model' object
		this.player2 = playerFactory(); // 'this' will refer to the 'Model' object
		// You can now use player1 and player2 as needed within the Model module.
	};
	const randomAI = function () {
		let length = this.gameBoard.getAvailSpot().length;
		if (length == 0) return;
		let position =
			this.gameBoard.getAvailSpot()[Math.floor(Math.random() * length)];
		this.player2.play(position);
		View.setMarker(document.getElementById(position), this.player2.marker);
	};
	// Include the 'gameBoard' module in the returned object.
	return { init, gameBoard, player1, player2, randomAI };
})();

const View = (() => {
	const playButton = document.getElementById("playButton");
	const resetButton = document.getElementById("resetButton");
	const marker = document.getElementById("marker");
	const difficulty = document.getElementById("difficulty");

	const init = function () {
		// Select the SVG elements with the class "svg" and hide them on page load
		this.svgElements = document.querySelectorAll(".gridMarker");
		for (const marker of this.svgElements) {
			marker.querySelector("svg").classList.add("d-none");
			marker.addEventListener("click", Controller.handleClick);
		}
		this.playButton.addEventListener("click", Controller.handlePlay);
		this.resetButton.addEventListener("click", Controller.handleReset);
	};
	const setMarker = function (clickedIcon, marker) {
		let svg;
		switch (marker) {
			case "X":
				svg = "cross-46.svg#cross";
				break;
			case "O":
				svg = "circle-ring.svg#ring";
				break;
			default:
				return;
		}
		clickedIcon.querySelector("use").setAttribute("xlink:href", svg);
		clickedIcon.classList.remove("d-none");
	};
	return { init, setMarker, playButton, resetButton, marker, difficulty };
})();

const Controller = (() => {
	const init = () => {
		View.init();
		Model.init();
	};
	const handlePosition = function (clickedPosition) {
		if (Controller.checkForGame() != "no") return false;
		if (Model.gameBoard.getAvailSpot().includes(clickedPosition)) {
			return true;
		} else {
			alert("Invalid move. Position is already taken or doesn't exist.");
			return false;
		}
	};
	const handleClick = function (e) {
		let clickedIcon = e.target.closest(".gridMarker");
		let clickedPosition = clickedIcon.querySelector("svg").id;
		if (Controller.handlePosition(clickedPosition)) {
			if (
				!View.marker.hasAttribute("disabled") ||
				View.marker.disabled == false
			)
				return;
			View.setMarker(clickedIcon.querySelector("svg"), Model.player1.marker);
			Model.player1.play(clickedPosition);
			Controller.checkForGame();
			console.log(Model.player1.winner);
			if (Model.player1.winner !== true && Model.player2.winner !== true) {
				Model.randomAI();
			}
		}
		let game = Controller.checkForGame();
		switch (game) {
			case "win":
				let winner;
				if (Model.player1.winner) {
					winner = "Player 1";
				} else if (Model.player2.winner) {
					winner = "Player 2";
				}

				alert(`${winner} won the game!`);
				for (const marker of View.svgElements) {
					marker.removeEventListener("click", Controller.handleClick);
				}

				break;

			case "draw":
				alert("The game is a draw");
				for (const marker of View.svgElements) {
					marker.removeEventListener("click", Controller.handleClick);
				}
				break;

			case "no":
			default:
				break;
		}
	};
	const handlePlay = function (e) {
		Model.player1.marker = View.marker.options[View.marker.selectedIndex].value;
		Model.player1.marker == "X"
			? (Model.player2.marker = "O")
			: (Model.player2.marker = "X");
		console.log("Player 1: ", Model.player1.marker);
		console.log("Player 2: ", Model.player2.marker);
		View.marker.disabled = true;
		View.difficulty.disabled = true;
	};
	const handleReset = function (e) {
		Controller.init();
		View.marker.disabled = false;
		View.difficulty.disabled = false;
	};
	const checkForGame = function () {
		const players = [Model.player1, Model.player2];
		players.forEach((player) => {
			if (player.checkForRow()) player.winner = true;
			if (player.checkForCol()) player.winner = true;
			if (player.checkForDiag()) player.winner = true;
			if (Model.gameBoard.getAvailSpot().length == 0) {
				player.draw = true;
			}
		});
		const anyPlayerWon = players.some((player) => player.winner === true);
		const anyPlayerdraw = players.some((player) => player.draw === true);
		if (anyPlayerWon) return "win";
		if (anyPlayerdraw) return "draw";
		return "no";
	};

	return {
		init,
		handlePosition,
		handleClick,
		handleReset,
		handlePlay,
		checkForGame,
	};
})();

export { Model, View, Controller };
