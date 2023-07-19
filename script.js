import { Model, View, Controller } from "./game.js";
Controller.init(); // Initialize the Model and get the returned objects.
console.log(Model.gameBoard.getAvailSpot()); 
Model.player1.play('r1c1'); 
console.log(Model.gameBoard.getAvailSpot()); 
