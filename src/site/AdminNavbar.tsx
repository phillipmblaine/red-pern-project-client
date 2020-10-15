import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import AdminHome from './AdminHome';
import AdminUser from '../components/AdminUser/AdminUser';
import AdminDestination from '../components/AdminDestination/AdminDestination';
import AdminTrip from '../components/AdminTrip/AdminTrip';
import './AdminNavbar.css';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Radium from 'radium';

type AdminNavbarState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
    clearUserLogin: () => void;
    role: string;
}

const AppBarStyles = withStyles({
    root: {
        background: 'linear-gradient(45deg, #111139 70%, #2123a0 50%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(135, 105, 255, .2)',
        color: 'white',
        height: 48,
        alignItems: 'flex-end',
        alignContent: 'space-between',
        justifyContent: 'center'
    }
})(AppBar)

const routerLinkToolbarStyles = { Button: { color: '#0CA5F4' } }

const mainToolbarStyles = {
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: '5px',
    paddingRight: '5px'
}

class AdminNavbar extends React.Component<AcceptedProps, AdminNavbarState>{
    render() {
        return (
            <div className='adminNavbarMainDiv'>
                {
                    this.props.role === 'admin' && this.props.sessionToken !== undefined
                        ? <Redirect to='/adminhome' /> : <Redirect to='/' />
                }
                {console.log('props from AcceptedProps:', this.props)}
                <AppBarStyles position='fixed'>
                    <Toolbar style={mainToolbarStyles}>
                        <Toolbar>
                            <Link to='/adminhome'><Button style={routerLinkToolbarStyles.Button}><HomeIcon /></Button></Link>
                            <Link to='/adminuser'><Button style={routerLinkToolbarStyles.Button}><PersonIcon /></Button></Link>
                            <Link to='/admindestination'><Button style={routerLinkToolbarStyles.Button}><LocationOnIcon /></Button></Link>
                            <Link to='admintrip'><Button style={routerLinkToolbarStyles.Button}><LanguageIcon /></Button></Link>
                        </Toolbar>
                        <Toolbar>
                            <Button color='primary' variant='contained' onClick={this.props.clearUserLogin}><PersonOutlineIcon /> Logout</Button>
                        </Toolbar>
                    </Toolbar>
                </AppBarStyles>
                <div className='adminNavbarRouterLinksOne'>
                    <Switch>
                        <Route exact path='/adminhome'>
                            <AdminHome sessionToken={this.props.sessionToken} /></Route>
                        <Route exact path='/adminuser'>
                            <AdminUser sessionToken={this.props.sessionToken} /></Route>
                        <Route exact path='/admindestination'>
                            <AdminDestination sessionToken={this.props.sessionToken} /></Route>
                        <Route exact path='/admintrip'>
                            <AdminTrip sessionToken={this.props.sessionToken} /></Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Radium(AdminNavbar);