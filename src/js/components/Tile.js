// Dependencies
import React from 'react';

export default class Tile extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const { value, row, col, position, mergedFrom, isNew } = this.props.tile;

    let componentClasses = [
      'tile',
      `tile--value-${value}`,
      `tile--position-${row}-${col}`
    ];

    componentClasses.push(
      mergedFrom ? 'tile--merged' : ''
    );
    componentClasses.push(
      isNew ? 'tile--new' : ''
    );

    return (
      <div class={componentClasses.join(' ').trim()}
        ref={el => this.tile = el }>
        {value}
      </div>
    );
  }
}