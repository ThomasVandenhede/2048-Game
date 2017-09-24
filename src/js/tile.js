export default function Tile(value) {
  Tile.id = Tile.id + 1;
  this.id = Tile.id;
  this.value = value;
  this.row = undefined;
  this.col = undefined;
  this.mergedFrom = null;
  this.isNew = true;
}

Tile.id = 0;

Tile.prototype.updatePosition = function(row, col) {
  this.row = row;
  this.col = col;
  if (this.mergedFrom) {
    this.mergedFrom[0].row = row;
    this.mergedFrom[0].col = col;
    this.mergedFrom[1].row = row;
    this.mergedFrom[1].col = col;
  }
  return this;
}

Tile.prototype.mergeFrom = function(tile1, tile2) {
  this.mergedFrom = [tile1, tile2];
  this.isNew = false;
  return this;
}