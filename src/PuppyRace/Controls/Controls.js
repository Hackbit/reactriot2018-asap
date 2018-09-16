import React from 'react';
import { PuppyRaceContext } from '../PuppyRaceContext';
import { GAME_STATUS, GAME_SPEED } from '../constants';
import './Controls.css';

export class Controls extends React.Component {
  render() {
    return (
      <PuppyRaceContext.Consumer>
        {({ state, actions }) => {
          const isPlaying = state.status === GAME_STATUS.START;
          const isFastMode = state.tickInterval === GAME_SPEED.FAST;
          return (
            <div className="ui fluid controls">
              <button
                className="ui blue button"
                onClick={() =>
                  !isPlaying ? actions.startGame() : actions.pauseGame()
                }
                disabled={state.status === GAME_STATUS.END}
              >
                <i className={`ui icon ${!isPlaying ? 'play' : 'pause'}`} />
                {!isPlaying ? 'START' : 'PAUSE'}
              </button>
              <button
                className={`ui basic toggle button icon ${
                  isFastMode ? 'active' : ''
                }`}
                onClick={() =>
                  actions.setSpeed(
                    isFastMode ? GAME_SPEED.NORMAL : GAME_SPEED.FAST
                  )
                }
                disabled={state.status !== GAME_STATUS.START}
              >
                <i className={`ui icon fast forward`} />
              </button>
              <button
                className="ui basic button"
                onClick={() => actions.resetGame()}
                disabled={
                  state.status === GAME_STATUS.START ||
                  state.status === GAME_STATUS.READY
                }
              >
                <i className={`ui icon refresh`} />
                RESET
              </button>
            </div>
          );
        }}
      </PuppyRaceContext.Consumer>
    );
  }
}
