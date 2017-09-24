// Dependencies
import React from 'react';

// Components
import Grid from './Grid';
import Tile from './Tile';

export default class BoardView extends React.Component {
  render() {
    const tilesComponents = this.props.tiles.map(tile => 
      <Tile tile={tile} key={tile.id} />
    );
    const gameOverOverlay = !this.props.isGameOver ? false :
      <div class='game__overlay'>

      </div>;

    return (
      <div class='game__board'>
        <Grid size={this.props.boardSize} />
        {tilesComponents}
        {gameOverOverlay}
      </div>
    );
  }
}