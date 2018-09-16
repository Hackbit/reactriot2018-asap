import React from 'react';
import { RaceTrack } from './RaceTrack';
import { Settings } from './Settings';

export class PuppyRace extends React.Component {
  render() {
    return (
      <div>
        <RaceTrack />
        <Settings />
      </div>
    );
  }
}
