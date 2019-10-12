import React from 'react';

import './GameTracker.scss';

class GameTracker extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMissionProgress = () => {
    const { missionNum, missionData } = this.props;
    return (
      <ul className='GameTracker__missionProgress'>
        {missionData.map((value, index) => {
          const status = missionData[index].status;
          const baseClassName = 'GameTracker__missionNumber';
          const activeClassName = index === missionNum ? "GameTracker__missionNumber--active" : '';
          const statusClassName = status === 'incomplete' ? '' : `GameTracker__missionNumber--${status}`;
          return <li key={index} className={`${baseClassName} ${activeClassName} ${statusClassName}`}>{index+1}</li>
        })}
      </ul>
    )
  }

  render() {
    return (
      <div className='GameTracker'>
        <button type='button' className='GameTracker__distribution'>{this.props.numGood}/{this.props.numBad}</button>
        {this.renderMissionProgress()}
        <button type='button'>Who am I</button>
      </div>
    );
  }
}

GameTracker.defaultProps = {
  numGood: 4,
  numBad: 3,
  missionNum: 2,
  missionData: [
    {status: 'success'},
    {status: 'incomplete'},
    {status: 'incomplete'},
    {status: 'incomplete'},
    {status: 'incomplete'}
  ]
};

export default GameTracker;
