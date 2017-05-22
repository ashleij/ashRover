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
var XcoordinatePosArr = [];
var YcoordinatePosArr = [];

//Formats the coordinates as '[x,y]'.
function roverPosition(x,y) {
	return "["+x+","+y+"]";
}

//Checks the coordinate for an obstacle before movement.
function checkForObstacles(x,y) {
	//Obstacle coordinates are [0,4],[-5,9], [10,1].
	if (x == 0 && y == 4 || x == -5 && y == 9 || x == 10 && y == 1) {
		console.log("Obstacle detected! Aborting any remaining commands...");
		return true;
	} else {
		return false;
	}
}

//Checks the Y coordinate to make sure it is not out of bounds (wrapping planet).
function checkIndexY(index) {
	if (index === 21) {
		indexY -= 21;
		return 0;
	} if (index === -1) {
		indexY += 21;
		return 20;
	} else {
		return index;
	}
}
//Checks the X coordinate to make sure it is not out of bounds (wrapping planet).
function checkIndexX(index) {
	if (index === 21) {
		indexX -= 21;
		return 0;
	} if (index === -1) {
		indexX += 21;
		return 20;
	} else {
		return index;
	}
}

//Starts the app, relays starting position.
function roverStart(){
	for (var i = -10; i <= 10; i++) {
		XcoordinatePosArr.push(i);
		YcoordinatePosArr.push(i);
	}
	indexX = 10;
	indexY = 10;
	cordX = XcoordinatePosArr[indexX];
	cordY = YcoordinatePosArr[indexY];
	pos = 'N';
	console.log("Your starting position is " + roverPosition(cordX,cordY) + ". You are facing " + pos + ".");
	getCommands();
}

//Handles the user's input for the rover's commands.
function getCommands(){
	if (commandArray.length > 0) {
		console.log(commandArray);
	}
	prompt.question("Enter your commands ('L' or 'R' to turn. 'F 'or 'B' to move. 'C' to finish entering commands.): ", (inputCommands) => {
		var inputCommandsUC = inputCommands.toUpperCase();
		if (inputCommandsUC == "L" || inputCommandsUC == "R" || inputCommandsUC == "F" || inputCommandsUC == "B") {
			commandArray.push(inputCommandsUC);
			getCommands();
		} else if (inputCommandsUC == "C") {
			roverGo();
		} else {
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
	//Rover turns right. Changes direction.
	} else if (x == "R") {
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
	//Rover moves forward. Changes coordinate.
	} else if (x == "F") {
		if (pos == "N") {
			indexY++;
			cordY = YcoordinatePosArr[checkIndexY(indexY)];
		} else if (pos == "S") {
			indexY--;
			cordY = YcoordinatePosArr[checkIndexY(indexY)];
		} else if (pos == "E") {
			indexX++;
			cordX = XcoordinatePosArr[checkIndexX(indexX)];
		} else if (pos == "W") {
			indexX--;
			cordX = XcoordinatePosArr[checkIndexX(indexX)];
		}
		return 'The rover moved forward. It is still facing ' + pos + ".";	
	} else if (x == "B") {
		if (pos == "N") {
			indexY--;
			cordY = YcoordinatePosArr[checkIndexY(indexY)];
		} else if (pos == "S") {
			indexY++;
			cordY = YcoordinatePosArr[checkIndexY(indexY)];
		} else if (pos == "E") {
			indexX--;
			cordX = XcoordinatePosArr[checkIndexX(indexX)];
		} else if (pos == "W") {
			indexX++;
			cordX = XcoordinatePosArr[checkIndexX(indexX)];
		}
		return 'The rover moved backward. It is still facing ' + pos + ".";
	}
}

//Moves the position of the rover according to the array.
function roverGo(){
	if (commandArray.length > 0) {
		console.log("Your commands are: " + commandArray);
		console.log("Launching rover...");
		for (var i = 0; i <= commandArray.length - 1; i++) {
			console.log(analyzeCommand(commandArray[i]));
			if (checkForObstacles(cordX,cordY) == false) {
				console.log("Movement success. The rover's new coordinates are: " + roverPosition(cordX,cordY));
				console.log("...");
			} else {
				break;
				prompt.close();
			}
		}
	} else {
		console.log("The rover was given no commands. Cancelling launch...");
	}
	prompt.close();
}

roverStart();