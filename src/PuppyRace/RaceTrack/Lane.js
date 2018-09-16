import React from 'react';
import PropTypes from 'prop-types';
import { Animal } from '../Animal';
import './Lane.css';

export class Lane extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    animal: PropTypes.shape(Animal.propTypes).isRequired
  };

  animalRef = React.createRef();

  getRankStyle() {
    const imageElement =
      this.animalRef.current &&
      this.animalRef.current.imgRef &&
      this.animalRef.current.imgRef.current;
    if (imageElement) {
      return { left: imageElement.offsetLeft + imageElement.clientWidth - 5 };
    } else {
      return { right: 10 };
    }
  }

  formatRank(rank) {
    if (rank === 1) {
      rank = rank += 'st 👑'
    } else if (rank === 2) {
      rank = rank += 'nd'
    } else {
      rank = rank += 'rd'
    }
    return rank;
  }

  render() {
    const { animal } = this.props;
    const { rank, name, finishedAt, progress } = animal;
    return (
      <div className={`lane ${finishedAt && 'finished'}`}>
        <Animal
          {...animal}
          style={{ marginLeft: `${progress}%` }}
          ref={this.animalRef}
        />
        {name && <span className="meta name" children={name} />}
        {rank && (
          <span
            className="meta rank"
            style={this.getRankStyle()}
            children={this.formatRank(rank)}
          />
        )}
      </div>
    );
  }
}
