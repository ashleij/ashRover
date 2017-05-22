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

//Checks the X or Y coordinate to make sure it is not out of bounds (wrapping planet).
function checkIndex(index, XorY) {
	if (index == XcoordinatePosArr.length && XorY == false) {
		indexX -= XcoordinatePosArr.length;
		return 0;
	} else if (index == YcoordinatePosArr.length && XorY == true) {
		indexY -= YcoordinatePosArr.length;
		return 0;
	} else if (index == -1 && XorY == false) {
		indexX += XcoordinatePosArr.length;
		return XcoordinatePosArr.length-1;
	} else if (index == -1 && XorY == true) {
		indexY += YcoordinatePosArr.length;
		return YcoordinatePosArr.length-1;
	} else {
		return index;
	}
}

//Starts the app, relays starting position.
function roverStart(){
	var gridSize = 10;
	for (var i = -(gridSize); i <= gridSize; i++) {
		XcoordinatePosArr.push(i);
		YcoordinatePosArr.push(i);
	}
	indexX = (XcoordinatePosArr.length - 1)/2
	indexY = (YcoordinatePosArr.length - 1)/2
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
			//Adds valid input to array.
			commandArray.push(inputCommandsUC);
			getCommands();
		} else if (inputCommandsUC == "C") {
			//Starts the rover.
			roverGo();
		} else {
			//Catches invalid input.
			console.log("Invalid Choice!");
			getCommands();
		}
	});
}

//Analyzes the commands in the array and moves the rover accordingly.
function analyzeCommand(command) {
	//Rover turns left. Changes direction.
	if (command == "L") {
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
	} else if (command == "R") {
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
	} else if (command == "F") {
		if (pos == "N") {
			indexY++;
			checkCordY = YcoordinatePosArr[checkIndex(indexY, true)];
			cordY = checkCordY;
		} else if (pos == "S") {
			indexY--;
			cordY = YcoordinatePosArr[checkIndex(indexY, true)];
		} else if (pos == "E") {
			indexX++;
			cordX = XcoordinatePosArr[checkIndex(indexX, false)];
		} else if (pos == "W") {
			indexX--;
			cordX = XcoordinatePosArr[checkIndex(indexX, false)];
		}
		return 'The rover moved forward. It is still facing ' + pos + ".";	
	//Rover moves backward. Changes coordinate.
	} else if (command == "B") {
		if (pos == "N") {
			indexY--;
			cordY = YcoordinatePosArr[checkIndex(indexY, true)];
		} else if (pos == "S") {
			indexY++;
			cordY = YcoordinatePosArr[checkIndex(indexY, true)];
		} else if (pos == "E") {
			indexX--;
			cordX = XcoordinatePosArr[checkIndex(indexX, false)];
		} else if (pos == "W") {
			indexX++;
			cordX = XcoordinatePosArr[checkIndex(indexX, false)];
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