import React from 'react';
import { Lane } from './Lane';
import { PuppyRaceContext } from '../PuppyRaceContext';

export class RaceTrack extends React.Component {
  render() {
    return (
      <PuppyRaceContext.Consumer>
        {({ state }) => (
          <div>
            {state.animals.map((animal, index) => (
              <Lane key={index} index={index} animal={animal} />
            ))}
          </div>
        )}
      </PuppyRaceContext.Consumer>
    );
  }
}
