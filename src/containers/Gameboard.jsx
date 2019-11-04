import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  gameboard: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  gameInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  questInfoItem: {
    display: 'flex'
  },
  playerList: {

  },
  playerListItem: {
    display: 'flex'
  }
}));

function Gameboard (props) {
  const classes = useStyles();
  const { kingOrder, boardInfo, missionsData } = props.roomData;
  const { missionSizes, doubleFailRequired } = boardInfo;

  return (
    <div className={classes.gameboard}>
      <div className={classes.gameInfo}>
        <div className={classes.questInfo}>
          {missionSizes.map( (misSize, ind) =>
            <QuestInfoItem
              misNum={ind}
              misSize={misSize}
              doubleFailRequired={doubleFailRequired}
              missionData={missionsData[ind]}
            />
          )}
        </div>
        <div className={classes.roomInfo}>
          Room Info: 
        </div>
      </div>

      <div className={classes.playerList}>
        {kingOrder.map( (player) => <PlayerListItem playerName={player} />)}
      </div>
    </div>
  );
};

function QuestInfoItem (props) {
  const classes = useStyles();
  const { misNum, misSize, doubleFailRequired, missionData } = props;
  const { status } = missionData;

  return (
    <div className={classes.questInfoItem}>
      <div>
        Q{misNum + 1}: {misSize}
      </div>
      <div> {status} </div>
    </div>
  );
}

function PlayerListItem (props) {
  const classes = useStyles();

  return (
    <div className={classes.playerListItem}>
      <div>[  X  ]</div>
      <div>{props.playerName}</div>
    </div>
  )
};

export default Gameboard;