import React from 'react';
import { RaceTrack } from './RaceTrack';
import { Settings } from './Settings';
import { PuppyRaceContext } from './PuppyRaceContext';
import { GAME_STATUS } from './constants';

export class PuppyRace extends React.Component {
  state = {
    animals: [],
    status: GAME_STATUS.READY
  };

  render() {
    return (
      <PuppyRaceContext.Provider value={{ state, actions }}>
        <div>
          <RaceTrack />
          <Settings />
        </div>
      </PuppyRaceContext.Provider>
    );
  }
}
