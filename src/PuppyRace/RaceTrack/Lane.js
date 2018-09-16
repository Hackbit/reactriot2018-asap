import React from 'react';
import PropTypes from 'prop-types';
import { Animal } from '../Animal';
import './Lane.css';

export class Lane extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    animal: PropTypes.shape(Animal.propTypes).isRequired
  };

  render() {
    const { animal } = this.props;
    const { progress } = animal;
    return (
      <div className="lane">
        <Animal {...animal} style={{ marginLeft: `${progress}%` }} />
      </div>
    );
  }
}
