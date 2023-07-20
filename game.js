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

	const playerFactory = () => {
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
		return { getPlayedSpot, play };
	};

	let player1;
	let player2;
	let gameWon;

	const init = function () {
		// Change to a regular function expression
		gameBoard.init();
		gameWon = false;
		this.player1 = playerFactory(); // 'this' will refer to the 'Model' object
		this.player2 = playerFactory(); // 'this' will refer to the 'Model' object
		// You can now use player1 and player2 as needed within the Model module.
	};

	// Include the 'gameBoard' module in the returned object.
	return { init, gameBoard, player1, player2 };
})();

const View = (() => {
	const playButton = document.getElementById("playButton");
	const resetButton = document.getElementById("resetButton");
	const marker = document.getElementById("marker");

	const init = function () {
		// Select the SVG elements with the class "svg" and hide them on page load
		const svgElements = document.querySelectorAll(".gridMarker");
		for (const marker of svgElements) {
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
            default :
                return
                
		}
		clickedIcon.querySelector("use").setAttribute("xlink:href", svg);
		clickedIcon.classList.remove("d-none");
	};
	return { init, setMarker, playButton, resetButton, marker };
})();

const Controller = (() => {
	const init = () => {
		View.init();
		Model.init();
	};
	const handlePosition = function (clickedPosition) {
		if (Model.gameWon) return false;
		return true;
	};
	const handleClick = function (e) {
		let clickedIcon = e.target;
		let clickedPosition = e.target.querySelector("svg").id;
		if (Controller.handlePosition(clickedPosition)) {
			View.setMarker(clickedIcon.querySelector("svg"), Model.player1.marker);
		}
		Model.gameWon ? alert("You Won!") : undefined;
	};
	const handlePlay = function (e) {
		Model.player1.marker = View.marker.options[View.marker.selectedIndex].value;
		Model.player1.marker == "X"
			? (Model.player2.marker = "O")
			: (Model.player2.marker = "X");
		console.log("Player 1: ", Model.player1.marker);
		console.log("Player 2: ", Model.player2.marker);
	};
	const handleReset = function (e) {
		Controller.init()
	};
	return { init, handlePosition, handleClick, handleReset,handlePlay };
})();

export { Model, View, Controller };
