// script.js - Versi ringan game 2048

const board = document.getElementById("game-board"); const size = 4; let grid = []; let score = 0;

function createBoard() { board.innerHTML = ""; for (let r = 0; r < size; r++) { const row = []; for (let c = 0; c < size; c++) { const cell = document.createElement("div"); cell.className = "cell"; cell.textContent = ""; board.appendChild(cell); row.push(0); } grid.push(row); } addRandomTile(); addRandomTile(); drawBoard(); }

function addRandomTile() { let empty = []; for (let r = 0; r < size; r++) { for (let c = 0; c < size; c++) { if (grid[r][c] === 0) empty.push({ r, c }); } } if (empty.length === 0) return; const { r, c } = empty[Math.floor(Math.random() * empty.length)]; grid[r][c] = Math.random() < 0.9 ? 2 : 4; }

function drawBoard() { const cells = board.querySelectorAll(".cell"); cells.forEach((cell, i) => { const r = Math.floor(i / size); const c = i % size; const val = grid[r][c]; cell.textContent = val === 0 ? "" : val; cell.className = "cell val-" + val; }); document.getElementById("score").textContent = "Score: " + score; }

function slide(row) { let arr = row.filter(v => v); for (let i = 0; i < arr.length - 1; i++) { if (arr[i] === arr[i + 1]) { arr[i] *= 2; score += arr[i]; arr[i + 1] = 0; } } return arr.filter(v => v).concat(Array(size - arr.filter(v => v).length).fill(0)); }

function rotateClockwise() { let newGrid = Array.from({ length: size }, () => Array(size).fill(0)); for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) newGrid[c][size - 1 - r] = grid[r][c]; grid = newGrid; }

function moveLeft() { let moved = false; for (let r = 0; r < size; r++) { const newRow = slide(grid[r]); if (grid[r].toString() !== newRow.toString()) moved = true; grid[r] = newRow; } if (moved) { addRandomTile(); drawBoard(); } }

function moveRight() { grid.forEach(row => row.reverse()); moveLeft(); grid.forEach(row => row.reverse()); }

function moveUp() { rotateClockwise(); rotateClockwise(); rotateClockwise(); moveLeft(); rotateClockwise(); }

function moveDown() { rotateClockwise(); moveLeft(); rotateClockwise(); rotateClockwise(); rotateClockwise(); }

document.addEventListener("keydown", e => { switch (e.key) { case "ArrowLeft": moveLeft(); break; case "ArrowRight": moveRight(); break; case "ArrowUp": moveUp(); break; case "ArrowDown": moveDown(); break; } });

createBoard();

