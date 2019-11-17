import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  gameboard: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  gameInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '80%',
  },
  questInfo: {
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  questInfoItem: {
    display: 'flex',
    height: '20%',
    borderBottom: '1px solid gray',
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  questInfoItemData: {
    width: '35%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  questInfoItemStatus: {
    width: '65%',
    borderLeft: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '28px',
    fontWeight: '700'
  },
  playerList: {
    borderLeft: '1px solid black',
    width: '35%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'

  },
  playerListHeader: {
    borderBottom: '1px solid gray'
  },
  playerListItem: {
    display: 'flex',
    borderBottom: '1px solid gray',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  playerListIcon: {
    width: '30%'
  },
  playerListName: {
    width: '70%',
    display: 'flex',
    justifyContent: 'center'
  },
  roomInfo: {
    height: '20%',
    borderTop: '1px solid black'
  },
  roomInfo_subheader: {
    fontWeight: 500
  },
  roomInfo_block: {
    width: '150px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  roomInfo_extendedBlock: {
    width: '500px',
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

function GameBoard (props) {
  const classes = useStyles();
  const { kingOrder = [], boardInfo = {}, missionsData = [], selectedRoles = [] } = props.roomData;
  const { missionSizes = [], doubleFailRequired, numGood, numBad, playerCount } = boardInfo;

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

        <div className={classes.playerList}>
          <div className={classes.playerListHeader}>King Order: </div>
          {kingOrder.map( (player) => <PlayerListItem playerName={player} />)}
        </div>
      </div>

      <div className={classes.roomInfo}>
          <h3>Room Info:</h3>
          <div>
            <div className={classes.roomInfo_block}>
              <div className={classes.roomInfo_subheader}>Player Count:</div>
              <div className={classes.roomInfo_data}>{ playerCount }</div>
            </div>
            <div className={classes.roomInfo_block}>
              <div className={classes.roomInfo_subheader}># of Good:</div>
              <div className={classes.roomInfo_data}>{ numGood }</div>
            </div>
            <div className={classes.roomInfo_block}>
              <div className={classes.roomInfo_subheader}># of Bad:</div>
              <div className={classes.roomInfo_data}>{ numBad }</div>
            </div>
            <div className={classes.roomInfo_extendedBlock}>
              <div className={classes.roomInfo_subheader}>Selected Roles:</div>
              <div className={classes.roomInfo_data}>{ selectedRoles.join(', ') }</div>
            </div>
          </div>
      </div>
    </div>
  );
};

function QuestInfoItem (props) {
  let backgroundColor = 'lightgray';
  let fontColor = 'black'

  const classes = useStyles();
  const { misNum, misSize, doubleFailRequired, missionData } = props;
  const { status } = missionData;

  const statusDisplay = status === 'incomplete' ? misSize.toString() : status;

  if (status !== 'incomplete') {
    backgroundColor = status === 'fail' ? '#FF4949' : '#006FC2'
    fontColor = 'white';
  }

  return (
    <div className={classes.questInfoItem}>
      <div className={classes.questInfoItemData}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{fontWeight: 800}}>Quest {misNum + 1}:</div>
          <div style={{}}>Size: {misSize}</div>
        </div>
        {(doubleFailRequired && misNum === 3) && <div style={{color: 'red'}}> TWO FAILS REQUIRED</div>}
      </div>
      <div
        className={classes.questInfoItemStatus}
        style={{ backgroundColor, color: fontColor }}
      >
        { statusDisplay.toUpperCase() }
      </div>
    </div>
  );
}

function PlayerListItem (props) {
  const classes = useStyles();

  return (
    <div className={classes.playerListItem}>
      <div className={classes.playerListIcon}>[  X  ]</div>
      <div className={classes.playerListName}>{props.playerName}</div>
    </div>
  )
};

export default GameBoard;
