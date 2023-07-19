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
		let playedSpot;
		playedSpot = [];
		const getPlayedSpot = () => playedSpot;
		const play = (position) => {
			let avail = Model.gameBoard.getAvailSpot();
			let index = avail.indexOf(position);
			if (index !== -1) {
				avail.splice(index, 1);
				Model.gameBoard.setAvailSpot(avail);
				playedSpot.push(position);
			} else {
				console.log(
					"Invalid move. Position is already taken or doesn't exist."
				);
			}
		};
		return { getPlayedSpot, play };
	};

	const init = () => {
		gameBoard.init();
		const player1 = playerFactory();
		const player2 = playerFactory();
		// You can now use player1 and player2 as needed within the Model module.
		return { gameBoard, player1, player2 }; // Return the objects as properties of Model.
	};
	// Include the 'gameBoard' module in the returned object.
	return { init, gameBoard };
})();

const View = (() => {
	const init = ((params) => {})();
	return { init };
})();

const Controller = (() => {
	return {};
})();

const modelInstance = Model.init(); // Initialize the Model and get the returned objects.
const player1 = modelInstance.player1; // Access player1 from the Model instance.
const player2 = modelInstance.player2; // Access player2 from the Model instance.


/* Model:
----------
The Model represents the data and business logic of the application. It is responsible for managing the data and providing methods to access, modify, and update it. Common methods in the Model include:

getData(): Retrieve data from the Model.
setData(data): Set or update the data in the Model.
updateData(data): Update specific data elements in the Model.
saveData(): Persist data changes (e.g., saving to a database).
deleteData(): Delete data from the Model.
-------
View:
The View is responsible for displaying the data to the user and presenting the user interface. It should have methods to render the data and respond to user input events. Common methods in the View include:
render(data): Display the data on the user interface.

updateView(data): Update the View with new data.
showLoading(): Display a loading indicator or message.
showError(message): Display an error message.
Event handling methods: These methods are responsible for responding to user interactions, such as button clicks, form submissions, etc.
---------
Controller:
The Controller acts as an intermediary between the Model and the View. It handles user input, processes the data, and updates both the Model and the View accordingly. Common methods in the Controller include:
handleRequest(request): Process user input and delegate actions to the Model or View.

updateModel(data): Update the Model based on user input or changes from the View.
updateView(data): Update the View based on changes in the Model.
initialize(): Initialize the Controller, set up event listeners, etc.
destroy(): Clean up resources and event listeners when the Controller is longer needed. */
