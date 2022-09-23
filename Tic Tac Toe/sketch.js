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


function setup() {
	createCanvas(widthOfBoard, heightOfBoard + heightOfButton);
	background(0, 250, 120);

	currentPlayer = player1;
	board = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	];
	
	strokeWeight(9);
	stroke(0, 120, 34);
	for (let i = 1; i < numberOfRows; i++) {
		line(widthOfBoard / numberOfColumns * i, smallGapNearEdge, widthOfBoard / numberOfColumns * i, widthOfBoard - smallGapNearEdge);
		line(smallGapNearEdge, heightOfBoard / numberOfRows * i, heightOfBoard - smallGapNearEdge, heightOfBoard / numberOfRows * i);
  	}	
	
	noStroke();
	fill(255);
	rect(0, heightOfBoard, widthOfBoard, heightOfButton);
	
	stroke(0);
	strokeWeight(3);
	fill(153, 224, 255);
	
	restartButton = rect(buttonX1, buttonY1, widthOfBoard / 2, heightOfButton);

	textSize(35);
	textAlign(CENTER);
	textFont("fantasy");
	text('RESTART', widthOfBoard / 2, heightOfBoard + 35);

}	

function draw() {

}

function drawX(i, j) {
	let gapW4 = widthOfBoard / 12;
	strokeWeight(20);
	stroke(0);
	line(widthOfBoard / 3 * j + gapW4, heightOfBoard / 3 * i + gapW4, widthOfBoard / 3 * j + 3 * gapW4, heightOfBoard / 3 * i + 3 * gapW4);
	line(widthOfBoard / 3 * j + 3 * gapW4, heightOfBoard / 3 * i + gapW4, widthOfBoard / 3 * j + gapW4, heightOfBoard / 3 * i + 3 * gapW4);
}

function drawO(i, j) {
	let gapW2 = widthOfBoard / 6;
	strokeWeight(20);
	stroke(0);
	fill(0, 250, 120);
	ellipse(widthOfBoard / 3 * j + gapW2 , heightOfBoard / 3 * i + gapW2, gapW2, gapW2);
}

function winLine(start, end) {
	let startI = start[0];
	let startJ = start[1];

	let endI = end[0];
	let endJ = end[1];

	strokeWeight(10);
	stroke(255, 0, 0);
	line(widthOfBoard / 3 * startJ + widthOfBoard / 6, heightOfBoard / 3 * startI + heightOfBoard / 6, widthOfBoard / 3 * endJ + widthOfBoard / 6, heightOfBoard / 3 * endI + heightOfBoard / 6);
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
	if ((buttonX1 <= mouseX && mouseX <= buttonX2) && (buttonY1 <= mouseY && mouseY < buttonY2))
		setup();
	
	if (mouseY < heightOfBoard && check4winner() === false) {
		let gapI = floor(mouseY / (widthOfBoard / 3));
		let gapJ = floor(mouseX / (heightOfBoard / 3));
		
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
		noStroke();
		textSize(65);
		fill(255);
		textAlign(CENTER);
		textStyle(BOLD);
		text('DRAW', 210, 230);
	}
	else if (check4winner()){
		let winner;
		const whoIsThePlayer = currentPlayer === 'X' ? winner = "O" : winner = "X";
	
		winLine(check4winner()[0], check4winner()[1]);
		noStroke();
		textSize(65);
		fill(255,255,102);
		textAlign(CENTER);
		textStyle(BOLD);
		text('GAME OVER', 210, 200);
		text(winner + " WON", 210, 265);
	}
}
