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
      createUser_user: '',
      createRoom_numPeople: 5,
      createRoom_isLancelot: false,
      createRoom_board: 5,
      createRoom_roomOwner: '',
      joinRoom_room: '',
      joinRoom_user: '',
      roomState_room: ''
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleBooleanOnChange = this.handleBooleanOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.createCreateRoomData = this.createCreateRoomData.bind(this);
    this.createJoinRoomData = this.createJoinRoomData.bind(this);
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

    // UTIL FUNCTIONS
    socket.on('GOT_ROOM_STATE', data => this.setState({status: 'GOT_ROOM_STATE', data}) );
    socket.on('GOT_ROOM_LIST', data => this.setState({status: 'GOT_ROOM_LIST', data}) );
    socket.on('GOT_FULL_STATE', data => this.setState({status: 'GOT_FULL_STATE', data}) );
    socket.on('STATE_CLEARED', data => this.setState({status: 'ROOM_CREATED', data}) );
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
    socket.emit(action, data);
  }

  createCreateRoomData() {
    return {
      numPeople: this.state.createRoom_numPeople,
      roomOwner: this.state.createRoom_roomOwner,
      isLancelot: this.state.createRoom_isLancelot,
      board: this.state.createRoom_board
    }
  }

  createJoinRoomData() {
    return {
      room: this.state.joinRoom_room,
      user: this.state.joinRoom_user
    }
  }

  render() {
    window.state = () => console.log(this.state);
    return (
      <div style={{width: '100%', height: '100%'}}>
        <h1>API UI</h1>
        <div style={{display: 'flex', justifyContent: 'space-between', height: '100%'}}>
          <div style={{width: '50%', height: '100%'}}>
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
                        checked={this.state.createRoom_isLancelot === true}
                        onChange={() => this.handleBooleanOnChange('createRoom_isLancelot', true)} /> True
                    </div>
                    <div>
                      <input
                        type='radio'
                        checked={this.state.createRoom_isLancelot === false}
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











            {/* ROOM_STATE*/}
            <form onSubmit={(e) => this.handleSubmit(e, 'ROOM_STATE', this.state.roomState_room)}>
              <div style={basicFlex}>
                <h4>Room State</h4>
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




          <div style={{width: '50%', height: '100%', borderLeft: '1px solid black', padding: '10px'}}>
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
