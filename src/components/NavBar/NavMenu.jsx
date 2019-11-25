import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Context from '../../Context';

const useStyles = makeStyles(theme => ({
}));

function NavMenu(props) {

  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChangeNameClick = () => {
    alert("sorry! change name coming soon");
    handleClose();
  }

  const onRematchClick = () => {
    alert("sorry! rematch coming soon");
    handleClose();
  }

  const onLeaveRoomClick = () => {
    alert("sorry! leave room coming soon");
    handleClose();
  }

  return (
    <Context.Consumer>
    {context => (
      <div>
        <IconButton
          edge="end"
          aria-label="more options"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={menuOpen}
          onClose={handleClose}
        >
          {context.isRoomOwner && (<MenuItem onClick={onRematchClick}>Rematch</MenuItem>)}
          {context.userCreated && <MenuItem onClick={onChangeNameClick}>Change Name</MenuItem>}
          {context.isInRoom && <MenuItem onClick={onLeaveRoomClick}>Leave Room</MenuItem>}
          {(context.isRoomOwner || context.userCreated || context.isInRoom) && <hr />}
          <a href='https://github.com/somethiiing/appvalon/' target='_blank' rel='noopener noreferrer'>
            <MenuItem>GitHub</MenuItem>
          </a>
        </Menu>
      </div>
    )}
    </Context.Consumer>
  );
}

export default NavMenu;
