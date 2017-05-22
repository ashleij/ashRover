//Requiring 'readline' for user input.
var readline = require('readline');

var prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Naming variables.
var cordX = 10;
var cordY = 10;
var pos = 'N';
var commandArray = [];

//Formats the coordinates as '[x,y]'.
function roverPosition(x,y) {
	return "["+x+","+y+"]";
}

//Handles the user's input for the rover's commands.
function getCommands() {
	console.log(commandArray);
	prompt.question("Enter your commands ('L' or 'R' to turn. 'F 'or 'B' to move. 'C' to finish entering commands.): ", (inputCommands) => {
		var inputCommandsUC = inputCommands.toUpperCase();
		if (inputCommandsUC == "L" || inputCommandsUC == "R" || inputCommandsUC == "F" || inputCommandsUC == "B") {
			//Adds valid input to array.
			commandArray.push(inputCommandsUC);
			getCommands();
		} else if (inputCommandsUC == "C") {
			//Starts the rover*
			console.log("Starting Rover...");
			prompt.close();
		} else {
			//Catches invalid input.
			console.log("Invalid Choice!");
			getCommands();
		}
	});
}

//Relays starting position.
console.log("Your starting position is " + roverPosition(cordX,cordY) + ". You are facing " + pos + ".");
getCommands();