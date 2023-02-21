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




/*----------------------------- Event Listeners -----------------------------*/




/*-------------------------------- Functions --------------------------------*/
