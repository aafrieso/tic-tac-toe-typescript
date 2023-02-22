// Constants 
var winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// Variables (state)
var board;
var turn;
var winner;
var tie;
var playerO = "O";
var playerX = "X";
var currentPlayer = playerO;
/*------------------------ Cached Element References ------------------------*/
var messageEl = document.getElementById("message");
var squareEls = document.querySelectorAll(".sqr");
var boardEl = document.querySelector(".board");
var resetBtnEl = document.querySelector(".reset-btn");
/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init);
/*-------------------------------- Functions --------------------------------*/
function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = false;
    tie = false;
    render();
}
init();
function render() {
    updateBoard();
    updateMessage();
}
function updateBoard() {
    board.forEach(function (square, idx) {
        if (square === 1) {
            squareEls[idx].innerHTML = "X";
        }
        else if (square === -1) {
            squareEls[idx].innerHTML = "O";
        }
        else {
            squareEls[idx].innerHTML = "";
        }
    });
}
function updateMessage() {
    if (winner === false && tie === false) {
        messageEl.textContent = "Player ".concat(turn === 1 ? 'X' : 'O', " turn");
    }
    else if (winner === false && tie === true) {
        messageEl.textContent = "It's a tie";
    }
    else {
        messageEl.textContent = "Yay! Player ".concat(turn === -1 ? 'O' : 'X', " wins!");
    }
}
function placePiece(idx) {
    board[idx] = turn;
}
function handleClick(evt) {
    if (winner === true) {
        return;
    }
    var target = evt.target;
    var sqIdx = target.id;
    var sliced = parseInt(sqIdx.slice(sqIdx.length - 1));
    if (board[sliced] === null) {
        placePiece(sliced);
        checkForWinner();
        checkForTie();
        switchPlayerTurn();
        render();
    }
}
function checkForTie() {
    tie = board.every(function (sqr) {
        return sqr !== null;
    });
}
function checkForWinner() {
    winningCombos.forEach(function (arr) {
        var winning = 0;
        arr.forEach(function (el) {
            winning += board[el] || 0;
        });
        if (Math.abs(winning) === 3) {
            winner = true;
        }
    });
}
function switchPlayerTurn() {
    if (winner === true) {
        return;
    }
    turn *= -1;
}
