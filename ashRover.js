//Requiring 'readline' for user input.
var readline = require('readline');

//Declaring readline functionality.
var prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Naming variables.
var cordX;
var cordY;
var pos;
var commandArray = [];

//Formats the coordinates as '[x,y]'.
function roverPosition(x,y) {
	return "["+x+","+y+"]";
}

//Starts the app, relays starting position.
function roverStart() {
	cordX = 0;
	cordY = 0;
	pos = 'N';
	console.log("Your starting position is " + roverPosition(cordX,cordY) + ". You are facing " + pos + ".");
	getCommands();
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
			//Starts the rover.
			console.log("Starting Rover...");
			roverGo();
		} else {
			//Catches invalid input.
			console.log("Invalid Choice!");
			getCommands();
		}
	});
}

//Analyzes the commands in the array and moves the rover accordingly.
function analyzeCommand(x) {
	//Rover turns left. Changes direction.
	if (x == "L") {
		if (pos == "N") {
			pos = "W";
		} else if (pos == "W") {
			pos = "S";
		} else if (pos == "S") {
			pos = "E";
		} else if (pos == "E") {
			pos = "N";
		}
		return 'The rover turned left. It is now facing ' + pos + ".";
	} else if (x == "R") {
		//Rover turns right. Changes direction.
		if (pos == "N") {
			pos = "E";
		} else if (pos == "E") {
			pos = "S";
		} else if (pos == "S") {
			pos = "W";
		} else if (pos == "W") {
			pos = "N";
		}
		return 'The rover turned right. It is now facing ' + pos + ".";
	} else if (x == "F") {
		//Rover moves forward. Changes coordinate.
		if (pos == "N") {
			cordY += 1;
		} else if (pos == "S") {
			cordY -= 1;
		} else if (pos == "E") {
			cordX += 1;
		} else if (pos == "W") {
			cordX -= 1;
		}
		return 'The rover moved forward. It is still facing ' + pos + ".";	
	} else if (x == "B") {
		//Rover moves backward. Changes coordinate.
		if (pos == "N") {
			cordY -= 1;
		} else if (pos == "S") {
			cordY += 1;
		} else if (pos == "E") {
			cordX -= 1;
		} else if (pos == "W") {
			cordX += 1;
		}
		return 'The rover moved backward. It is still facing ' + pos + ".";
	}
}

//Moves the position of the rover according to the array.
function roverGo() {
	console.log("Your commands are: " + commandArray);
		for (var i = 0; i <= commandArray.length - 1; i++) {
			console.log(analyzeCommand(commandArray[i]));	
				console.log(roverPosition(cordX,cordY));
		}	
}

roverStart();