// Dependencies
import React from 'react';

export function GridCell() {
  return (
    <div class='grid__cell'></div>
  );
}

export default function Grid(props) {
  const gridRows = Array(props.size[0]).fill().map((e, i) =>
    <div class='grid__row' key={i} >
      {
        Array(props.size[1]).fill().map((e, j) =>
          <GridCell key={j + i * props.size[1]} />
        )
      }
    </div>
  );

  return (
    <div class='game__grid grid'>
      {gridRows}
    </div>
  );
}