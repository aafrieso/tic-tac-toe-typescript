/*-------------------------------- Constants --------------------------------*/

const squareEls = document.querySelectorAll('div');
const messageEls = document.getElementById('message') as HTMLElement;
const resetBtnEl = document.querySelector('button') as HTMLButtonElement;

const winningCombos: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/

let board: (number | null)[];
let turn: number;
let winner: boolean;
let tie: boolean;
const playerO = "O";
const playerX = "X";
let currentPlayer: string = playerO;

/*------------------------ Cached Element References ------------------------*/

const messageEl = document.getElementById("message") as HTMLElement;
const squareEls = document.querySelectorAll(".sqr") as NodeListOf<HTMLDivElement>;
const boardEl = document.querySelector(".board") as HTMLElement;

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init);

/*-------------------------------- Functions --------------------------------*/

function init(): void {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = false;
  tie = false;
  render();
}

init();

function render(): void {
  updateBoard();
  updateMessage();
}

function updateBoard(): void {
  board.forEach(function(square: number | null, idx: number): void {
    if (square === 1) {
      squareEls[idx].innerHTML = "X";
    } else if (square === -1) {
      squareEls[idx].innerHTML = "O";
    } else {
      squareEls[idx].innerHTML = "";
    }
  })
}
function updateMessage(): void {
  if (winner === false && tie === false) {
    messageEl.textContent = `player ${turn === 1 ? 'X' : 'O'} turn`;
  } else if (winner === false && tie === true) {
    messageEl.textContent = `${1 === -1 ? 'X' : 'O'} it's a tie`;
  } else {
    messageEl.textContent = `Yay player ${turn === -1 ? 'O' : 'X'} wins!`;
  }
}

function placePiece(idx: number): void {
  board[idx] = turn;
}
