const board = document.getElementById("game-board");
const scoreText = document.getElementById("score");
let grid = [];
let score = 0;

function initBoard() {
  board.innerHTML = "";
  grid = Array(4).fill().map(() => Array(4).fill(0));
  addRandomTile();
  addRandomTile();
  drawBoard();
  updateScore();
}

function drawBoard() {
  board.innerHTML = "";
  grid.forEach(row => {
    row.forEach(cell => {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      if (cell !== 0) {
        tile.textContent = cell;
        tile.classList.add(`tile-${cell}`);
      }
      board.appendChild(tile);
    });
  });
}

function addRandomTile() {
  const empty = [];
  grid.forEach((row, i) =>
    row.forEach((cell, j) => {
      if (cell === 0) empty.push({ i, j });
    })
  );
  if (empty.length === 0) return;
  const { i, j } = empty[Math.floor(Math.random() * empty.length)];
  grid[i][j] = Math.random() > 0.9 ? 4 : 2;
}

function slide(row) {
  const arr = row.filter(val => val);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2;
      score += arr[i];
      arr[i + 1] = 0;
    }
  }
  return arr.filter(val => val).concat(Array(4 - arr.filter(val => val).length).fill(0));
}

function rotateGridClockwise() {
  grid = grid[0].map((_, i) => grid.map(row => row[i]).reverse());
}

function rotateGridCounterClockwise() {
  grid = grid[0].map((_, i) => grid.map(row => row[3 - i]));
}

function handleInput(dir) {
  let moved = false;
  for (let i = 0; i < (dir === "up" || dir === "down" ? 1 : 0); i++) {
    if (dir === "up") rotateGridCounterClockwise();
    if (dir === "down") rotateGridClockwise();
  }

  for (let i = 0; i < 4; i++) {
    let original = [...grid[i]];
    let newRow = slide(grid[i]);
    if (original.toString() !== newRow.toString()) moved = true;
    grid[i] = newRow;
  }

  for (let i = 0; i < (dir === "up" || dir === "down" ? 1 : 0); i++) {
    if (dir === "up") rotateGridClockwise();
    if (dir === "down") rotateGridCounterClockwise();
  }

  if (moved) {
    addRandomTile();
    drawBoard();
    updateScore();
    checkGameOver();
  }
}

function updateScore() {
  scoreText.textContent = `Score: ${score}`;
}

function checkGameOver() {
  if (grid.flat().includes(0)) return;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] === grid[i][j + 1] || grid[j][i] === grid[j + 1][i]) {
        return;
      }
    }
  }

  alert("Game Over!");
}

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowLeft": handleInput("left"); break;
    case "ArrowRight": 
      grid = grid.map(row => row.reverse());
      handleInput("left");
      grid = grid.map(row => row.reverse());
      break;
    case "ArrowUp": handleInput("up"); break;
    case "ArrowDown": handleInput("down"); break;
  }
});

initBoard();
