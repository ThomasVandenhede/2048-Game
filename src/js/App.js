// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import GameContainer from './components/Game';

// Styles
import Style from '../style/sass/main.scss';

ReactDOM.render(
  <GameContainer boardSize={[4, 4]} />,
  document.getElementById('root')
);