// Dependencies
import React from 'react';

// Components
import Scoreboard from './Scoreboard';
import BoardView from './BoardView';

// Utility
import Board from '../board';
import Tile from '../tile';

export default class GameContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      bestScore: 0,
      isGameOver: false,
      board: new Board(props.boardSize),
    };
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUpdate(nextProps, nextState) {

  }

  handleKeyDown(event) {
    const keysToListenTo = {
      "ArrowUp": 1,
      "ArrowRight": 2,
      "ArrowDown": 3,
      "ArrowLeft": 0,
    };

    if (Object.keys(keysToListenTo).includes(event.key)) {
      let direction = keysToListenTo[event.key];

      event.preventDefault();
      if (!this.state.isGameOver) {
        this.setState({board: this.state.board.move(direction)});
        this.updateScore();
        this.setState({isGameOver: this.isGameOver()});
      }
    }
  }

  newGame = () => {
    this.setState({
      board: new Board(this.props.boardSize),
      isGameOver: false,
      score: 0,
    });
  }

  updateScore = () => {
    let newScore, scoreInc = 0;
    const mergedTiles = this.state.board.getTiles().filter(tile => {
      return tile.mergedFrom;
    })

    for (let tile of mergedTiles) {
      scoreInc = scoreInc + tile.value;
    }
    newScore = this.state.score + scoreInc;

    this.setState({
      score: newScore,
      bestScore: Math.max(newScore, this.state.bestScore),
    });
  }

  isGameOver = () => {
    const [n, m] = this.props.boardSize;
    const gameOverCondition = (
      this.state.board.isBoardFull() &&
      !this.state.board.hasAdjacentTiles());

    return (gameOverCondition);
  }

  canTilesMove = (tileLine) => {
    for (let i = 1; i < tileLine.length; i = i + 1) {
      if (tileLine[i].value === tileLine[i - 1].value) {
        return true;
      }
    }

    return false;
  }

  render() {
    return (
      <div class='game'>
        <Scoreboard
          score={this.state.score}
          bestScore={this.state.bestScore}
          newGame={this.newGame} />
        <BoardView
          tiles={this.state.board.getTiles()}
          boardSize={this.props.boardSize}
          isGameOver={this.state.isGameOver} />
      </div>
    );
  }
}