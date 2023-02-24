const grid = [
  [3, 0, 8, 4],
  [2, 4, 5, 7],
  [9, 2, 6, 3],
  [0, 3, 1, 0]
]

const cellsChildren = document.querySelectorAll('.cell');

function maxIncrease(grid) {
  const gridSize = grid.length;
  grid.map(row => row.push(Math.max(...row)));
  const maxColRow = [];
  for (let i = 0; i < gridSize; i++) {
    const curCol = [];
    for (let j = 0; j < gridSize; j++) {
      curCol.push(grid[j][i]);
    }
    maxColRow.push(Math.max(...curCol));
  }
  grid.push(maxColRow);
  const newGrid = [];
  const diffGrid = [];
  for (let k = 0; k < gridSize; k++) {
    const newRow = [];
    const diffRow = [];
    for (let l = 0; l < gridSize; l++) {
      const localMin = Math.min(grid[k][gridSize], grid[gridSize][l]);
      newRow.push(Math.max(localMin,grid[k][l]));
      diffRow.push(localMin - grid[k][l]);
    }
    newGrid.push(newRow);
    diffGrid.push(diffRow);
  }
  return newGrid;
}

function randomRGB() {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}

for (let child in cellsChildren) {
  const flattenGrid = grid.flat();
  // cellsChildren[child].style.backgroundColor = 'green';
  cellsChildren[child].style.backgroundColor = randomRGB();
  cellsChildren[child].value = flattenGrid[child];
  cellsChildren[child].style.zIndex = flattenGrid[child];
  cellsChildren[child].style.transform = `scale(${1 + flattenGrid[child] * 0.08})`;
  setTimeout(resetGrid, 3500);

  cellsChildren[child].addEventListener('change', function () {
    this.innerText = this.value;
    this.style.zIndex = this.value;
    this.style.transform = `scale(${1 + this.value * 0.08})`;

    setTimeout(resetGrid, 1750);

  });
}

function resetGrid() {
  const grid1 = [];
  for (let i = 0; i < grid.length; i++) {
    const row1 = [];
    for (let j = 0; j < grid.length; j++) {
      row1.push(cellsChildren[j + i * grid.length].value);
    }
    grid1.push(row1);
  }
  const newGrig = maxIncrease(grid1);

  for (let ch in cellsChildren) {
    const flattenGrid = newGrig.flat();
    cellsChildren[ch].style.backgroundColor = randomRGB();
    cellsChildren[ch].value = flattenGrid[ch];
    cellsChildren[ch].style.zIndex = flattenGrid[ch];
    cellsChildren[ch].style.transform = `scale(${1 + flattenGrid[ch] * 0.08})`;
  }
  clearInterval();
}