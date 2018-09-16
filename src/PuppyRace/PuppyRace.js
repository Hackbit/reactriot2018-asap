import React from 'react';
import { clamp, random } from 'lodash-es';
import { RaceTrack } from './RaceTrack';
import { Settings } from './Settings';
import { PuppyRaceContext } from './PuppyRaceContext';
import { GAME_STATUS, ANIMAL_STATUS } from './constants';

export class PuppyRace extends React.Component {
  state = {
    animals: [],
    status: GAME_STATUS.READY,
    tickInterval: 100
  };

  intervalTimer = null;

  actions = {
    setState: (state, callback) => this.setState(state, callback),
    startGame: () =>
      this.state.status !== GAME_STATUS.START &&
      this.setState({ status: GAME_STATUS.START }, () => {
        this.intervalTimer = setInterval(this.onTick, this.state.tickInterval);
      }),
    pauseGame: () => {
      clearInterval(this.intervalTimer);
      if (this.state.status !== GAME_STATUS.PAUSE) {
        this.setState({ status: GAME_STATUS.PAUSE });
      }
    },
    resetGame: () => {
      clearInterval(this.intervalTimer);
      this.setState({
        status: GAME_STATUS.READY,
        animals: this.state.animals.map((animal) => ({
          ...animal,
          status: ANIMAL_STATUS.STANDING,
          progress: 0,
          recoverAt: null,
          finishedAt: null,
          rank: null
        }))
      });
    }
  };

  onTick = () => {
    if (this.state.status === GAME_STATUS.START) {
      const animals = this.state.animals.map((animal, index) => {
        // calc animal progress
        animal = { ...animal, progress: animal.progress || 0 };
        if (animal.progress < 100) {
          const runOrLoss =
            (animal.recoverAt && Number(animal.recoverAt) > Date.now()) ||
            random(0, 300) === index
              ? 'loss'
              : 'run';
          if (runOrLoss === 'run') {
            animal.status = ANIMAL_STATUS.RUNNING;
            animal.progress = clamp(animal.progress + random(1, true), 100);
            animal.recoverAt = null;
          } else if (animal.status !== ANIMAL_STATUS.LOSS) {
            animal.status = ANIMAL_STATUS.LOSS;
            animal.recoverAt = new Date(Date.now() + random(1500, 2500));
          }
        }
        if (animal.progress === 100 && !animal.finishedAt) {
          animal.status = ANIMAL_STATUS.STANDING;
          animal.finishedAt = new Date();
        }
        return animal;
      });

      const sorted = []
        .concat(animals)
        .sort(
          (lValue, rValue) =>
            rValue.progress - lValue.progress ||
            lValue.finishedAt - rValue.finishedAt ||
            0
        );

      animals.forEach(
        (animal) =>
          (animal.rank = sorted.findIndex((value) => value === animal) + 1)
      );

      const status = animals.every((animal) => animal.finishedAt)
        ? GAME_STATUS.END
        : this.state.status;
        
      this.setState({ animals, status });
    } else {
      clearInterval(this.intervalTimer);
    }
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
