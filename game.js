const Model = (() => {
	const gameBoard = (() => {
		let availSpot;

		const init = () => {
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

	const init = function () {
		// Change to a regular function expression
		gameBoard.init();
		this.player1 = playerFactory(); // 'this' will refer to the 'Model' object
		this.player2 = playerFactory(); // 'this' will refer to the 'Model' object
		// You can now use player1 and player2 as needed within the Model module.
	};

	// Include the 'gameBoard' module in the returned object.
	return { init, gameBoard, player1, player2 };
})();

const View = (() => {
	const init = () => {
		// Select the SVG elements with the class "svg" and hide them on page load
		const svgElements = document.querySelectorAll(".gridMarker");
		for (const marker of svgElements) {
			marker.classList.add("d-none");
		}
	};
	return { init };
})();

const Controller = (() => {
	const init = () => {
		View.init();
		Model.init();
	};
	return { init };
})();

export { Model, View, Controller };
