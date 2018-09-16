import React from 'react';
import { PuppyRaceContext } from '../PuppyRaceContext';
import { GAME_STATUS } from '../constants';

export class Controls extends React.Component {
  render() {
    return (
      <PuppyRaceContext.Consumer>
        {({ state, actions }) => {
          const isPlaying = state.status === GAME_STATUS.START;
          return (
            <div className="ui fluid">
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
                className="ui green button"
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
