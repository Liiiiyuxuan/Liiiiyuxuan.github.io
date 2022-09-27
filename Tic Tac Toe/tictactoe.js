let numberOfColumns = 3, numberOfRows = 3;
let widthOfBoard = 420;
let heightOfBoard = 420;
let heightOfButton = 50;
let smallGapNearEdge = 5;
let player1 = 'X', player2 = 'O';
let board;
let currentPlayer;
let restartButton;
let buttonX1 = widthOfBoard / 4;
let buttonX2 = buttonX1 + widthOfBoard / 2;
let buttonY1 = heightOfBoard;
let buttonY2 = heightOfBoard + heightOfButton;
let restartTimer = 10000;


function setup() {
	createCanvas(widthOfBoard, heightOfBoard + heightOfButton);
	background(0, 250, 120);

	currentPlayer = player1;
	board = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	];
	
	// Draw the four lines to get the grids needed for the game board
	strokeWeight(9);
	stroke(0, 120, 34);
	for (let i = 1; i < numberOfRows; i++) {
		line(widthOfBoard / numberOfColumns * i, smallGapNearEdge, widthOfBoard / numberOfColumns * i, widthOfBoard - smallGapNearEdge);
		line(smallGapNearEdge, heightOfBoard / numberOfRows * i, heightOfBoard - smallGapNearEdge, heightOfBoard / numberOfRows * i);
  	}	
	
	// Make the colour of the margin white 
	noStroke();
	fill(255);
	rect(0, heightOfBoard, widthOfBoard, heightOfButton);
	
	stroke(0);
	strokeWeight(3);
	fill(153, 224, 255);
	
	// Create the restart button 
	restartButton = rect(buttonX1, buttonY1, widthOfBoard / 2, heightOfButton);

	// Text in the restart button
	let sizeOfText2 = 35;
	textSize(sizeOfText2);
	textAlign(CENTER);
	textFont("fantasy");
	text('RESTART', widthOfBoard / 2, heightOfBoard + sizeOfText2);

}	

function draw() {

}

function drawX(i, j) {
	let lengthOfCorrectionX = widthOfBoard / 12;
	strokeWeight(20);
	stroke(0);
	line(widthOfBoard / numberOfColumns * j + lengthOfCorrectionX, heightOfBoard / numberOfRows * i + lengthOfCorrectionX, 
	widthOfBoard / numberOfColumns * j + 3 * lengthOfCorrectionX, heightOfBoard / numberOfRows * i + 3 * lengthOfCorrectionX);
	line(widthOfBoard / numberOfColumns * j + 3 * lengthOfCorrectionX, heightOfBoard / numberOfRows * i + lengthOfCorrectionX, 
	widthOfBoard / numberOfColumns * j + lengthOfCorrectionX, heightOfBoard / numberOfRows * i + 3 * lengthOfCorrectionX);
}

function drawO(i, j) {
	let lengthOfCorrectionO = widthOfBoard / 6;
	
	strokeWeight(20);
	stroke(0);
	fill(0, 250, 120);
	ellipse(widthOfBoard / numberOfColumns * j + lengthOfCorrectionO , heightOfBoard / numberOfRows * i + lengthOfCorrectionO, lengthOfCorrectionO, lengthOfCorrectionO);
}

function winLine(start, end) {
	let startI = start[0];
	let startJ = start[1];

	let endI = end[0];
	let endJ = end[1];

	strokeWeight(10);
	stroke(255, 0, 0);
	line(widthOfBoard / 3 * startJ + widthOfBoard / 6, heightOfBoard / 3 * startI + heightOfBoard / 6, 
	widthOfBoard / 3 * endJ + widthOfBoard / 6, heightOfBoard / 3 * endI + heightOfBoard / 6);
}

function check4winner() {
	for (let j = 0; j < numberOfColumns; j++) {
		if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] != '')
		    return [[0, j], [2, j]];
	}
	for (let i = 0; i < numberOfRows; i++) {
		if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] != '')
			return [[i, 0], [i, 2]];
	}

	if (board[0][0] === board[1][1] && board[1][1] == board[2][2] && board[0][0] != '')
		return [[0, 0], [2, 2]];

	else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] != '')
		return [[0, 2], [2, 0]];

	let isDraw = 0;
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			if (board[i][j] != '')
				isDraw++;
			if (i === 2 && j === 2 && isDraw === 9) {
				return 'Draw';
			}
		}
	}

	return false;
}

function mouseClicked() {
	// If the mouse is clicked in the region of the restart button
	if ((buttonX1 <= mouseX && mouseX <= buttonX2) && (buttonY1 <= mouseY && mouseY < buttonY2))
		setup();
	
	if (mouseY < heightOfBoard && check4winner() === false) {
		let gapI = floor(mouseY / (widthOfBoard / numberOfColumns));
		let gapJ = floor(mouseX / (heightOfBoard / numberOfRows));
		
		if (currentPlayer === player1 && board[gapI][gapJ] === '') {
			drawX(gapI, gapJ);
			board[gapI][gapJ] = player1;
			currentPlayer = player2;
		}
		else if (currentPlayer === player2 && board[gapI][gapJ] === '') {
			drawO(gapI, gapJ);
			board[gapI][gapJ] = player2;
			currentPlayer = player1;
		}
	}

	if (check4winner() === 'Draw') {
		let sizeOfText1 = 65;

		noStroke();
		textSize(sizeOfText1);
		fill(255);
		textAlign(CENTER);
		textStyle(BOLD);
		text('DRAW', widthOfBoard / 2, (heightOfBoard + heightOfButton) / 2);

	}
	else if (check4winner()){
		let winner;
		let sizeOfText1 = 65;
		const whoIsThePlayer = currentPlayer === 'X' ? winner = "O" : winner = "X";
	
		winLine(check4winner()[0], check4winner()[1]);
		noStroke();
		textSize(sizeOfText1);
		fill(255,255,102);
		textAlign(CENTER);
		textStyle(BOLD);
		text('GAME OVER', widthOfBoard / 2, heightOfBoard / 2);
		text(winner + " WON", widthOfBoard / 2, heightOfBoard / 2 + sizeOfText1);
	}
}
