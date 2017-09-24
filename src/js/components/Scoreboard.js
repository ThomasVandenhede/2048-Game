// Dependencies
import React from 'react';

export default class Scoreboard extends React.Component {  
  render() {
    return (
      <div class='game__scoreboard scoreboard'>
        <div class='score-container'>
          <h2>Score</h2>
          <p>{this.props.score}</p>
        </div>
        <div class='best-container'>
          <h2>Best</h2>
          <p>{this.props.bestScore}</p>
        </div>
        <button class='new' onClick={this.props.newGame}>New Game</button>
      </div>
    );
  }
}