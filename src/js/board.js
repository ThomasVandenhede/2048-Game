import Tile from './tile';

function rotateLeft(arr) {
  let [n, m] = [arr.length, arr[0].length];
  let result = [];

  for (let i = 0; i < m; i = i + 1) {
    result.push([]);
    for (let j = 0; j < n; j = j + 1) {
        result[i][j] = arr[j][m - i - 1];
    }
  }

  return result;
}

export default function Board(size) {
  [this.n, this.m] = size;
  this.cells = this.initialize();
  this.addStartingTiles(2);
}

Board.prototype.initialize = function() {
  let grid = [];

  for (let i = 0; i < this.n; i = i + 1) {
    grid.push([]);
    for (let j = 0; j < this.m; j = j + 1) {
      grid[i][j] = null;
    }
  }

  return grid;
}

Board.fourProbability = .1;

Board.prototype.addStartingTiles = function(count) {
  for (let i = 0; i < count; i = i + 1) {
    this.addRandomTile();
  }
}

Board.prototype.addRandomTile = function() {
  const emptyPositions = this.getEmptyPositions();
  let newTile, value, row, col;
  const length = emptyPositions.length;

  if (length !== 0) {
    value = Math.random() < Board.fourProbability ? 4 : 2;
    [row, col] = emptyPositions[Math.floor(Math.random()*length)];
    this.cells[row][col] = new Tile(value);
  }
}

Board.prototype.getEmptyPositions = function() {
  let emptyPositions = [];
  this.eachCell((i, j, cell) => {
    if (!cell) {
      emptyPositions.push([i, j]);
    }
  });
  return emptyPositions;
}

Board.prototype.moveLeft = function() {
  let [n, m] = [this.cells.length, this.cells[0].length];
  let hasMoved = false;
  for (let i = 0; i < n; i = i + 1) {
    let row = this.cells[i];
    let prevTileIndex = (row[0] ? 0 : -1);

    for (let j = 1; j < m; j = j + 1) {
      let cell = row[j];
      let successfulMove = false;

      if (cell) {
        let prevTile = (prevTileIndex >= 0 ? row[prevTileIndex] : undefined);
        let moveCondition = (!prevTile ||
          (prevTile.value !== cell.value) ||
          (prevTile.mergedFrom));

        if (moveCondition) {
          prevTileIndex = prevTileIndex + 1;
          successfulMove = this.moveCell(i, j, i, prevTileIndex);
          hasMoved = hasMoved || successfulMove;
        } else {
          const mergedTile = new Tile(cell.value * 2).mergeFrom(cell, prevTile);
          row[prevTileIndex] = mergedTile;
          row[j] = null;
          hasMoved = true;
        }
      }
    }
  }
  return hasMoved;
}

Board.prototype.move = function(direction) {
  let hasMoved = false;
  this.clearOldTiles();
  for (let i = 0; i < direction; i = i + 1) {
    this.cells = rotateLeft(this.cells);
  }
  hasMoved = this.moveLeft();
  for (let i = direction; i < 4; i = i + 1) {
    this.cells = rotateLeft(this.cells);
  }
  if (hasMoved) {
    this.addRandomTile();
  }
  return this;
}

Board.prototype.clearOldTiles = function() {
  this.eachCell((i, j, cell) => {
    if (cell) {
      cell.isNew = false;
      cell.mergedFrom = null;
    }
  });
}

Board.prototype.moveCell = function(row, col, newRow, newCol) {
  if (row !== newRow || col !== newCol) {
    this.cells[newRow][newCol] = this.cells[row][col];
    this.cells[row][col] = null;
    return true;
  } else {
    return false;
  }
}

Board.prototype.getTiles = function() {
  let tiles = [];

  this.eachCell((i, j, cell) => {
    if (cell) {
      tiles.push(cell.updatePosition(i + 1, j + 1));

      if (cell.mergedFrom) {
        tiles.push(...cell.mergedFrom)
      }
    }
  });
  tiles.sort((a, b) => (a.id - b.id));

  return tiles;
}

Board.prototype.isBoardFull = function() {
  return (!this.getEmptyPositions().length);
}

Board.prototype.hasAdjacentTiles = function() {
  for (let i = 0; i < this.n; i = i + 1) {
    for (let j = 0; j < this.m; j = j + 1) {
      if (j > 0 && (this.cells[i][j].value === this.cells[i][j-1].value)) {
        return true;
      }
      if (i > 0 && (this.cells[i][j].value === this.cells[i-1][j].value)) {
        return true;
      }
    }
  }
  return false;
}

Board.prototype.eachCell = function(callback) {
  for (let i = 0; i < this.n; i = i + 1) {
    for (let j = 0; j < this.m; j = j + 1) {
      callback(i, j, this.cells[i][j]);
    }
  }
}