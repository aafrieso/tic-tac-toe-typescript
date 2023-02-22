// Constants 
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

// Variables (state)

let board: (number | null)[];
let turn: number;
let winner: boolean;
let tie: boolean;
const playerO = "O";
const playerX = "X";
let currentPlayer: string = playerO;

// Cached Element References

const messageEl = document.getElementById("message") as HTMLElement;
const squareEls = document.querySelectorAll(".sqr") as NodeListOf<HTMLDivElement>;
const boardEl = document.querySelector(".board") as HTMLElement;
const resetBtnEl = document.querySelector(".reset-btn") as HTMLButtonElement;

// Event Listeners

boardEl.addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init);

// Functions 

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
    messageEl.textContent = `Player ${turn === 1 ? 'X' : 'O'} turn`;
  } else if (winner === false && tie === true) {
    messageEl.textContent = `It's a tie`;
  } else {
    messageEl.textContent = `Yay! Player ${turn === -1 ? 'O' : 'X'} wins!`;
  }
}

function placePiece(idx: number): void {
  board[idx] = turn;
}

function handleClick(evt: MouseEvent): void {
  if (winner === true) {
    return;
  }
  
  const target = evt.target as HTMLDivElement;
  const sqIdx = target.id;
  const sliced = parseInt(sqIdx.slice(sqIdx.length - 1));
  if (board[sliced] === null) {
    placePiece(sliced);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
  }
}

function checkForTie(): void {
  tie = board.every(function(sqr: number | null): boolean {
    return sqr !== null;
  });
}

function checkForWinner(): void {
  winningCombos.forEach(function(arr: number[]): void {
    let winning = 0;
    arr.forEach(function(el: number): void {
      winning += board[el] || 0;
    });
    if (Math.abs(winning) === 3) {
      winner = true;
    }
  });
}

function switchPlayerTurn(): void {
  if (winner === true) {
    return;
  }
  turn *= -1;
}
