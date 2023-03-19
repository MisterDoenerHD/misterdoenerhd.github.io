// Variablen
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var grid = 20;
var height = canvas.height / grid;
var width = canvas.width / grid;
var blockWidth = grid - 2;
var currentPiece = null;
var score = 0;

// Spielbrett
var board = [];
for (var row = 0; row < height; row++) {
  board[row] = [];
  for (var column = 0; column < width; column++) {
    board[row][column] = "";
  }
}

// Steine
var pieces = [
  [1, 1, 1, 1], // I
  [1, 1, 0, 1, 1], // X
  [1, 1, 1, 0, 0, 1], // Z
  [0, 1, 1, 1, 1], // L
  [1, 1, 1, 0, 1] // T
];

// Funktionen
function drawSquare(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x * grid, y * grid, blockWidth, blockWidth);
}

function drawBoard() {
  for (var row = 0; row < height; row++) {
    for (var column = 0; column < width; column++) {
      if (board[row][column] !== "") {
        drawSquare(column, row, board[row][column]);
      }
    }
  }
}

function newPiece() {
  var randomPiece = Math.floor(Math.random() * pieces.length);
  var piece = pieces[randomPiece];
  currentPiece = {
    position: { x: 4, y: 0 },
    blocks: piece,
    color: "#" + ((1 << 24) * Math.random() | 0).toString(16)
  };
}

function drawPiece() {
  var blocks = currentPiece.blocks;
  var color = currentPiece.color;
  var position = currentPiece.position;
  for (var i = 0; i < blocks.length; i++) {
    var row = Math.floor(i / blocks.length);
    var column = i % blocks.length;
    if (blocks[i]) {
      drawSquare(column + position.x, row + position.y, color);
    }
  }
}

function moveDown() {
  var newPosition = { x: currentPiece.position.x, y: currentPiece.position.y + 1 };
  if (validMove(newPosition, currentPiece.blocks)) {
    currentPiece.position = newPosition;
  } else {
    addPieceToBoard();
    clearLines();
    newPiece();
  }
}

function validMove(position, blocks) {
  for (var i = 0; i < blocks.length; i++) {
    var row = Math.floor(i / blocks.length);
    var column = i % blocks.length;
    if (blocks[i]) {
      var newX = position.x + column;
      var newY = position.y + row;
      if (newX < 0 || newX >= width || newY >= height) {
        return
