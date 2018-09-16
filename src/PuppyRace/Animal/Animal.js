import React from 'react';
import PropTypes from 'prop-types';
import { ANIMAL_TYPES, ANIMAL_STATUS } from '../constants';
import './Animal.css';

const ANIMAL_SPRITES = {
  dog: {
    [ANIMAL_STATUS.STANDING]: require('./dog_standing.gif'),
    [ANIMAL_STATUS.RUNNING]: require('./dog_running.gif'),
    [ANIMAL_STATUS.LOSS]: require('./dog_loss.gif')
  },
  cat: {
    [ANIMAL_STATUS.STANDING]: require('./cat_standing.gif'),
    [ANIMAL_STATUS.RUNNING]: require('./cat_running.gif'),
    [ANIMAL_STATUS.LOSS]: require('./cat_loss.gif')
  }
};

export class Animal extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(Object.keys(ANIMAL_TYPES).map((key) => ANIMAL_TYPES[key])),
    name: PropTypes.string,
    color: PropTypes.string,
    progress: PropTypes.number,
    status: PropTypes.oneOf(Object.keys(ANIMAL_STATUS).map((key) => ANIMAL_STATUS[key]))
  };

  static defaultProps = {
    type: ANIMAL_TYPES.DOG,
    color: '#000000',
    progress: 0, // 0 to 100
    status: ANIMAL_STATUS.STANDING
  };

  render() {
    const { type, status } = this.props;
    const image = ANIMAL_SPRITES[type][status];
    return <img src={image} alt={type} className={`animal ${type}`} />;
  }
}
