import React from 'react';
import './AdminNavbar.css';
// makestyles for newer react, withstyles for older
import { withStyles } from '@material-ui/core/styles';
// this is the same
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
// import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

type AdminNavbarState = {}
type AcceptedProps = {
    clearUserLogin: () => void;
    // clearToken: () => void;
    // clearRole: () => void; 
}

const Styles = withStyles({
    root: {
        // fe6b8b, ff8e53
        background: 'linear-gradient(45deg, #220000 70%, #ff239e 50%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        // padding: '0 30px'
    }
})(AppBar)


class AdminNavbar extends React.Component<AcceptedProps, AdminNavbarState>{
    render() {
        return (
            <div className='adminNavbarMainDiv'>
                <Styles position='static'>
                    <Toolbar>
                        <IconButton edge='start' color='inherit' aria-label='menu'>
                            <MenuIcon />
                            <PersonIcon />
                            <PersonOutlineIcon />
                        </IconButton>

                    </Toolbar>
                </Styles>
                <h2>Hello from AdminNavbar.tsx</h2>
                <button onClick={this.props.clearUserLogin}>Logout</button>
            </div>
        )
    }
}

export default AdminNavbar;