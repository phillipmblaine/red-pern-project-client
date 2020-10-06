import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import UserHome from './UserHome';
import UserTrip from '../components/UserTrip/UserTrip';
import UserDestination from '../components/UserDestination/UserDestination';
import './UserNavbar.css';
// makestyles for newer react, withstyles for older
import { withStyles } from '@material-ui/core/styles';
// this is the same
import { AppBar, Button, IconButton, MenuItem, Toolbar } from '@material-ui/core';
// import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Radium from 'radium';

type UserNavbarState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
    clearUserLogin: () => void;
}

const AppBarStyles = withStyles({
    root: {
        // fe6b8b, ff8e53
        background: 'linear-gradient(45deg, #220000 70%, #ff239e 50%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        alignItems: 'flex-end',
        alignContent: 'space-between',
        justifyContent: 'center'
        // padding: '0 30px'
    }
})(AppBar)

const routerLinkToolbarStyles = {
    // padding: 0    
}

const mainToolbarStyles = {
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: '5px',
    paddingRight: '5px'
}

const userToolbarStyles = {
    // paddingRight: 0
}

class UserNavbar extends React.Component<AcceptedProps, UserNavbarState>{
    render() {
        return (
            <div className='userNavbarMainDiv'>
                {/* <h2>Hello from UserNavbar.tsx</h2> */}
                <AppBarStyles position='fixed' style={routerLinkToolbarStyles}>
                    <Toolbar style={mainToolbarStyles}>
                        <Toolbar>
                            <MenuItem><Link to='/userhome'>Admin Home</Link></MenuItem>
                            <MenuItem><Link to='/userdestination'>Admin Destination</Link></MenuItem>
                            <MenuItem><Link to='usertrip'>Admin Trip</Link></MenuItem>
                        </Toolbar>
                        <Toolbar style={userToolbarStyles}>
                            <IconButton edge='start' color='inherit' aria-label='menu'>
                                <MenuIcon />
                            </IconButton>
                            <IconButton edge='start' color='inherit' aria-label='menu'>
                                <PersonIcon />
                            </IconButton>
                            <Button variant='contained' onClick={this.props.clearUserLogin}><PersonOutlineIcon /> Logout</Button>
                        </Toolbar>
                    </Toolbar>
                </AppBarStyles>
                {/* <div className='userNavbarRouterLinksOne'>
                    <p>
                        <Link to='/userhome'>User Home</Link>
                        <Link to='usertrip'>User Trip</Link>
                        <Link to='userdestination'>User Destination</Link>
                    </p>
                </div> */}
                <div className='userNavbarRouterLinksOne'>
                    <Switch>
                        <Route exact path='/userhome'><UserHome sessionToken={this.props.sessionToken} /></Route>
                        <Route exact path='/usertrip'><UserTrip sessionToken={this.props.sessionToken} /></Route>
                        <Route exact path='/userdestination'><UserDestination sessionToken={this.props.sessionToken} /></Route>
                    </Switch>
                </div>


            </div >
        )
    }
}

export default Radium(UserNavbar);