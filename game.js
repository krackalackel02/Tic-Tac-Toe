const Model = ((params) => {
    const playerFactory = () => {
        return {}
    }
    const player1 = playerFactory()
    const player2 = playerFactory()

    return {getData,setData,updateData,saveData,deleteData}
})()
const View = (() => {
    return {render,updateView,showLoading,showError}
})()
const Controller = ((params) => {
    return{handleRequest,updateModel,updateView,initialise,destroy}
})()


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