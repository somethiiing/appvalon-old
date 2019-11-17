import React from 'react';
import io from 'socket.io-client';

const basicFlex = {
  padding: '15px',
  display: 'flex',
  flexDirection: 'column'
};

const fieldFlex = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between'
}

let socket;

export default class ApiUI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      status: '',
      dispatchedData: {},
      createUser_user: '',
      createRoom_numPeople: 5,
      createRoom_isLancelot: false,
      createRoom_board: 5,
      createRoom_roomOwner: '',
      joinRoom_room: '',
      joinRoom_user: '',
      submitTeamProposal_room: '',
      submitTeamProposal_name1: '',
      submitTeamProposal_name2: '',
      submitTeamProposal_name3: '',
      submitTeamProposal_name4: '',
      submitTeamProposal_name5: '',
      voteForProposedTeam_room: '',
      voteForProposedTeam_player: '',
      voteForProposedTeam_vote: false,
      finalizeProposedTeam_room: '',
      submitProposedTeam_room: '',
      roomState_room: '',

    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleBooleanOnChange = this.handleBooleanOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.createCreateRoomData = this.createCreateRoomData.bind(this);
    this.createJoinRoomData = this.createJoinRoomData.bind(this);
    this.createSubmitTeamProposalData = this.createSubmitTeamProposalData.bind(this);

  }

  componentDidMount() {
    socket = io('http://localhost:5000');

    // CREATE_USER
    socket.on('USER_EXISTS', data => this.setState({status: 'USER_EXISTS', data}) );
    socket.on('USER_CREATED', data => this.setState({status: 'USER_CREATED', data}) );

    // CREATE_ROOM
    socket.on('ROOMS_FULL', data => this.setState({status: 'ROOMS_FULL', data}) );
    socket.on('ROOM_CREATED', data => this.setState({status: 'ROOM_CREATED', data}) );

    // JOIN_ROOM
    socket.on('GAME_START', data => this.setState({status: 'GAME_START', data}) );
    socket.on('JOIN_ROOM_SUCCESS', data => this.setState({status: 'JOIN_ROOM_SUCCESS', data}) );
    socket.on('JOIN_ROOM_ROOM_NOT_FOUND', data => this.setState({status: 'JOIN_ROOM_ROOM_NOT_FOUND', data}) );
    socket.on('ROOM_FULL', data => this.setState({status: 'ROOM_FULL', data}) );

    // SUBMIT_TEAM_PROPSAL
    socket.on('TEAM_PROPOSED', data => this.setState({status: 'TEAM_PROPOSED', data}));

    //VOTE_FOR_PROPOSED_TEAM
    socket.on('PROPOSED_TEAM_VOTE_REGISTERED', data => this.setState({status: 'PROPOSED_TEAM_VOTE_REGISTERED', data}));

    //FINALIZE_PROPOSED_TEAM_VOTING
    socket.on('PROPOSED_TEAM_VOTE_COUNTDOWN', data => this.setState({status: 'PROPOSED_TEAM_VOTE_COUNTDOWN', data}));
    socket.on('NOT_ENOUGH_VOTES', data => this.setState({status: 'NOT_ENOUGH_VOTES', data}));

    //SUBMIT_PROPOSED_TEAM_VOTING
    socket.on('START_MISSION_VOTING', data => this.setState({status: 'START_MISSION_VOTING', data}));
    socket.on('START_PROPOSING_TEAM', data => this.setState({status: 'START_PROPOSING_TEAM', data}));

    // UTIL FUNCTIONS
    socket.on('GOT_ROOM_STATE', data => this.setState({status: 'GOT_ROOM_STATE', data}) );
    socket.on('GOT_ROOM_LIST', data => this.setState({status: 'GOT_ROOM_LIST', data}) );
    socket.on('GOT_FULL_STATE', data => this.setState({status: 'GOT_FULL_STATE', data}) );
    socket.on('STATE_CLEARED', data => this.setState({status: 'ROOM_CREATED', data}) );

    // error handling
    socket.on('ROOM_NOT_FOUND', data => this.setState({status: 'ROOM_NOT_FOUND', data}))

  }

  handleInputOnChange(e, key) {
    const temp = {};
    temp[key] = e.target.value;
    this.setState(temp);
  }

  handleBooleanOnChange(key, value) {
    const temp = {};
    temp[key] = value;
    this.setState(temp);
  }

  handleSubmit(e, action, data) {
    e.preventDefault();
    this.setState({dispatchedData: data})
    socket.emit(action, data);
  }

  createCreateRoomData() {
    return {
      numPeople: Number(this.state.createRoom_numPeople),
      roomOwner: this.state.createRoom_roomOwner,
      isLancelot: this.state.createRoom_isLancelot,
      board: Number(this.state.createRoom_board)
    }
  }

  createJoinRoomData() {
    return {
      room: this.state.joinRoom_room,
      user: this.state.joinRoom_user
    }
  }

  createSubmitTeamProposalData(){
    let nominationArr = [this.state.submitTeamProposal_name1, this.state.submitTeamProposal_name2];
    if (this.state.submitTeamProposal_name3) {
      nominationArr.push(this.state.submitTeamProposal_name1);
    }
    if (this.state.submitTeamProposal_name4) {
      nominationArr.push(this.state.submitTeamProposal_name4);
    }
    if (this.state.submitTeamProposal_name5) {
      nominationArr.push(this.state.name5);
    }

    return {
      room: this.state.submitTeamProposal_room,
      nominationArr
    }
  }

  createVoteForProposedTeam() {
    return {
      room: this.state.voteForProposedTeam_room,
      player: this.state.voteForProposedTeam_player,
      vote: this.state.voteForProposedTeam_vote ? 'APPROVE' : 'REJECT'
    }
  }

  render() {
    window.state = () => console.log(this.state);
    return (
      <div style={{width: '100%', height: '100%', overflowY: 'hidden'}}>
        <h1>API UI</h1>
        <div style={{display: 'flex', justifyContent: 'space-between', height: '100%'}}>
          <div style={{width: '50%', height: '90%', overflowY: 'scroll'}}>
            <h3>API stuff</h3>

            {/* CREATE_USER*/}
            <form onSubmit={(e) => this.handleSubmit(e, 'CREATE_USER', this.state.createUser_user)}>
              <div style={basicFlex}>
                <h4>Create User</h4>
                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>User: </label>
                  <input style={{width: '75%'}} value={this.state.createUser_user} onChange={(e) => this.handleInputOnChange(e, 'createUser_user')} />
                </div>
                <button>Submit</button>
              </div>
              <hr />
            </form>

            {/* CREATE_ROOM */}
            <form onSubmit={(e) => this.handleSubmit(e, 'CREATE_ROOM', this.createCreateRoomData())} >
              <div style={basicFlex}>
                <h4>Create Room</h4>

                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>numPeople: </label>
                  <input style={{width: '75%'}}
                    max={12}
                    min={5}
                    type='number'
                    value={this.state.createRoom_numPeople}
                    onChange={(e) => this.handleInputOnChange(e, 'createRoom_numPeople')} />
                </div>

                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>roomOwner: </label>
                  <input style={{width: '75%'}}
                    value={this.state.createRoom_roomOwner}
                    onChange={(e) => this.handleInputOnChange(e, 'createRoom_roomOwner')} />
                </div>

                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>isLancelot: </label>
                  <div style={{display: 'flex', justifyContent: 'space-around', width: '75%'}}>
                    <div>
                      <input
                        type='radio'
                        checked={this.state.createRoom_isLancelot}
                        onChange={() => this.handleBooleanOnChange('createRoom_isLancelot', true)} /> True
                    </div>
                    <div>
                      <input
                        type='radio'
                        checked={!this.state.createRoom_isLancelot}
                        onChange={() => this.handleBooleanOnChange('createRoom_isLancelot', false)} /> False
                    </div>
                  </div>
                </div>

                { this.state.createRoom_isLancelot &&
                  <div style={fieldFlex}>
                    <label style={{width: '25%'}}>board: </label>
                    <input style={{width: '75%'}}
                      type='number'
                      max={12}
                      min={5}
                      value={this.state.createRoom_board}
                      onChange={(e) => this.handleInputOnChange(e, 'createRoom_board')} />
                  </div>
                }

                <button>Submit</button>
              </div>
              <hr />
            </form>

            {/* JOIN_ROOM*/}
            <form onSubmit={(e) => this.handleSubmit(e, 'JOIN_ROOM', this.createJoinRoomData())}>
              <div style={basicFlex}>
                <h4>Join Room</h4>
                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>Room: </label>
                  <input style={{width: '75%'}} value={this.state.joinRoom_room}
                    onChange={(e) => this.handleInputOnChange(e, 'joinRoom_room')} />
                </div>
                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>User: </label>
                  <input style={{width: '75%'}} value={this.state.joinRoom_user}
                    onChange={(e) => this.handleInputOnChange(e, 'joinRoom_user')} />
                </div>
                <button>Submit</button>
              </div>
              <hr />
            </form>

            {/* SUBMIT_TEAM_PROPOSAL*/}
            <form onSubmit={(e) => this.handleSubmit(e, 'SUBMIT_TEAM_PROPOSAL', this.createSubmitTeamProposalData())}>
              <div style={basicFlex}>
                <h4>Submit Team Proposal</h4>
                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>room name: </label>
                  <input style={{width: '75%'}} value={this.state.submitTeamProposal_room} onChange={(e) => this.handleInputOnChange(e, 'submitTeamProposal_room')} />
                </div>
                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>name1: </label>
                  <input style={{width: '75%'}}
                    placeholder='REQUIRED'
                    value={this.state.submitTeamProposal_name1}
                    onChange={(e) => this.handleInputOnChange(e, 'submitTeamProposal_name1')} />
                </div>
                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>name2: </label>
                  <input style={{width: '75%'}}
                    placeholder='REQUIRED'
                    value={this.state.submitTeamProposal_name2}
                    onChange={(e) => this.handleInputOnChange(e, 'submitTeamProposal_name2')} />
                </div>
                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>name3: </label>
                  <input style={{width: '75%'}}
                    value={this.state.submitTeamProposal_name3}
                    onChange={(e) => this.handleInputOnChange(e, 'submitTeamProposal_name3')} />
                </div>
                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>name4: </label>
                  <input style={{width: '75%'}}
                    value={this.state.submitTeamProposal_name4}
                    onChange={(e) => this.handleInputOnChange(e, 'submitTeamProposal_name4')} />
                </div>
                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>name5: </label>
                  <input style={{width: '75%'}}
                    value={this.state.submitTeamProposal_name5}
                    onChange={(e) => this.handleInputOnChange(e, 'submitTeamProposal_name5')} />
                </div>
                <button>Submit</button>
              </div>
              <hr />
            </form>

             {/* VOTE_FOR_PROPOSED_TEAM */}
            <form onSubmit={(e) => this.handleSubmit(e, 'VOTE_FOR_PROPOSED_TEAM', this.createVoteForProposedTeam())}>
              <div style={basicFlex}>
                <h4>Vote For Proposed Team</h4>
                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>Room: </label>
                  <input style={{width: '75%'}} value={this.state.voteForProposedTeam_room}
                    onChange={(e) => this.handleInputOnChange(e, 'voteForProposedTeam_room')} />
                </div>
                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>Player: </label>
                  <input style={{width: '75%'}} value={this.state.voteForProposedTeam_player}
                    onChange={(e) => this.handleInputOnChange(e, 'voteForProposedTeam_player')} />
                </div>
                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>Vote: </label>
                  <div style={{display: 'flex', justifyContent: 'space-around', width: '75%'}}>
                    <div>
                      <input
                        type='radio'
                        checked={this.state.voteForProposedTeam_vote}
                        onChange={() => this.handleBooleanOnChange('voteForProposedTeam_vote', true)} /> Approve
                    </div>
                    <div>
                      <input
                        type='radio'
                        checked={!this.state.voteForProposedTeam_vote}
                        onChange={() => this.handleBooleanOnChange('voteForProposedTeam_vote', false)} /> Reject
                    </div>
                  </div>
                </div>
                <button>Submit</button>
              </div>
              <hr />
            </form>

             {/*FINALIZE_PROPOSED_TEAM_VOTING*/}
            <form onSubmit={(e) => this.handleSubmit(e, 'FINALIZE_PROPOSED_TEAM_VOTING', {room: this.state.finalizeProposedTeam_room})}>
              <div style={basicFlex}>
                <h4>Finalize Proposed Team Voting</h4>
                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>Room: </label>
                  <input style={{width: '75%'}} value={this.state.finalizeProposedTeam_room}
                    onChange={(e) => this.handleInputOnChange(e, 'finalizeProposedTeam_room')} />
                </div>
                <button>Submit</button>
              </div>
              <hr/>
            </form>

            {/*SUBMIT_PROPOSED_TEAM_VOTE*/}
            <form onSubmit={(e) => this.handleSubmit(e, 'SUBMIT_PROPOSED_TEAM_VOTE', {room: this.state.submitProposedTeam_room} )}>
              <div style={basicFlex}>
                <h4>Submit Proposed Team Vote</h4>
                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>Room: </label>
                  <input style={{width: '75%'}} value={this.state.submitProposedTeam_room}
                    onChange={(e) => this.handleInputOnChange(e, 'submitProposedTeam_room')} />
                </div>
                <button>Submit</button>
              </div>
              <hr/>
            </form>

            <br /><br /><br /><br /><br /><br /><br />
            <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
            <br /><br /><br /><br /><br /><br /><br />

            {/* ROOM_STATE*/}
            <form onSubmit={(e) => this.handleSubmit(e, 'ROOM_STATE', this.state.roomState_room)}>
              <div style={basicFlex}>
                <h4>ROOM STATE</h4>
                <div style={fieldFlex}>
                  <label style={{width: '25%'}}>User: </label>
                  <input style={{width: '75%'}} value={this.state.roomState_room} onChange={(e) => this.handleInputOnChange(e, 'roomState_room')} />
                </div>
                <button>Submit</button>
              </div>
              <hr />
            </form>

            {/* ROOM_LIST*/}
            <form onSubmit={(e) => this.handleSubmit(e, 'ROOM_LIST')}>
              <div style={basicFlex}>
                <h4>ROOM LIST</h4>
                <button>Submit</button>
              </div>
              <hr />
            </form>

            {/* FULL_STATE*/}
            <form onSubmit={(e) => this.handleSubmit(e, 'FULL_STATE')}>
              <div style={basicFlex}>
                <h4>FULL STATE</h4>
                <button>Submit</button>
              </div>
              <hr />
            </form>

            {/* CLEAR_STATE*/}
            <form onSubmit={(e) => this.handleSubmit(e, 'CLEAR_STATE')}>
              <div style={basicFlex}>
                <h4>CLEAR STATE</h4>
                <button>Submit</button>
              </div>
              <hr />
            </form>

          </div>




          <div style={{width: '50%', height: '100%', borderLeft: '1px solid black', padding: '10px', overflowY: 'scroll'}}>
            <div>
              <h3>Server State</h3>
                <div>Status: {this.state.status}</div>
                <pre> {JSON.stringify(this.state.data, null, 2)} </pre>
              <hr/>
            </div>

            <div>
              <h3>Whole State</h3>
              <div style={{width: '100%', height: '100%'}}>
                <pre> {JSON.stringify(this.state, null, 2)} </pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
