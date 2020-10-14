import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import UserHome from './UserHome';
import UserTrip from '../components/UserTrip/UserTrip';
import UserDestination from '../components/UserDestination/UserDestination';
import './UserNavbar.css';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Radium from 'radium';

type UserNavbarState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
    clearUserLogin: () => void;
}

const AppBarStyles = withStyles({
    root: {
        background: 'linear-gradient(45deg, #220000 70%, #993355 50%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        alignItems: 'flex-end',
        alignContent: 'space-between',
        justifyContent: 'center'
    }
})(AppBar)

const routerLinkToolbarStyles = { Button: { color: '#ab5476' } }

const logoutButtonStyle = {
    background: '#ab5476',
    color: 'whitesmoke'
}

const mainToolbarStyles = {
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: '5px',
    paddingRight: '5px',
    color: 'navy'
}

class UserNavbar extends React.Component<AcceptedProps, UserNavbarState>{
    render() {
        return (
            <div className='userNavbarMainDiv'>
                {
                    this.props.sessionToken === undefined && this.props.sessionToken === '' ?
                        <Redirect to='/' />
                        : <span></span>
                }
                <AppBarStyles position='fixed'>
                    <Toolbar style={mainToolbarStyles}>
                        <Toolbar>
                            <Link to='/'><Button style={routerLinkToolbarStyles.Button}><HomeIcon /></Button></Link>
                            <Link to='/userdestination'><Button style={routerLinkToolbarStyles.Button}><LocationOnIcon /></Button></Link>
                            <Link to='usertrip'><Button style={routerLinkToolbarStyles.Button}><LanguageIcon /></Button></Link>
                        </Toolbar>
                        <Toolbar>
                            <Button style={logoutButtonStyle} variant='contained' onClick={this.props.clearUserLogin}><PersonOutlineIcon /> Logout</Button>
                        </Toolbar>
                    </Toolbar>
                </AppBarStyles>
                <div className='userNavbarRouterLinksOne'>
                    <Switch>
                        <Route exact path='/'>
                            <UserHome sessionToken={this.props.sessionToken} /></Route>
                        <Route exact path='/usertrip'>
                            <UserTrip sessionToken={this.props.sessionToken} /></Route>
                        <Route exact path='/userdestination'>
                            <UserDestination sessionToken={this.props.sessionToken} /></Route>
                    </Switch>
                </div>
            </div >
        )
    }
}

export default Radium(UserNavbar);