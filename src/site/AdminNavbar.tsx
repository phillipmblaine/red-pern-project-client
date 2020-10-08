import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AdminHome from './AdminHome';
import AdminUser from '../components/AdminUser/AdminUser';
import AdminDestination from '../components/AdminDestination/AdminDestination';
import AdminTrip from '../components/AdminTrip/AdminTrip';
import './AdminNavbar.css';
// makestyles for newer react, withstyles for older
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// this is the same
import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';
// import AppBar from '@material-ui/core/AppBar';
// import MenuIcon from '@material-ui/icons/Menu';
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
    // classes: {
    //     root: {
    //         color: string;
    //         background: string;
    //     }
    // };
}

// const styles = {
//     root: {
//         color: 'darkslategray',
//         background: '#462784',
//     }
// }

const AppBarStyles = withStyles({
    root: {
        // #ff239e
        // fe6b8b, ff8e53
        // background: 'linear-gradient(45deg, #391111 70%, #572331 50%)',
        background: 'linear-gradient(45deg, #111139 70%, #2123a0 50%)',
        border: 0,
        borderRadius: 3,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        boxShadow: '0 3px 5px 2px rgba(135, 105, 255, .2)',
        color: 'white',
        height: 48,
        alignItems: 'flex-end',
        alignContent: 'space-between',
        justifyContent: 'center'
        // padding: '0 30px'
    },
    // button: {
    //     background: 'black'
    // }
})(AppBar)

const routerLinkToolbarStyles = {
    Button: {
        // background: 'pink',
        color: '#0CA5F4'
    }
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


class AdminNavbar extends React.Component<AcceptedProps, AdminNavbarState>{
    constructor(props: AcceptedProps) {
        super(props)
    }
    render() {
        // const { classes } = this.props;

        return (
            <div className='adminNavbarMainDiv'>
                {console.log('props from AcceptedProps:', this.props)}
                {/* {console.log('props from AcceptedProps:', this.props)} */}
                {/* <h2>Hello from AdminNavbar.tsx</h2> */}
                <AppBarStyles position='fixed'>
                    <Toolbar style={mainToolbarStyles}>
                        <Toolbar>
                            <Link to='/adminhome'><Button style={routerLinkToolbarStyles.Button}><HomeIcon /></Button></Link>
                            <Link to='/adminuser'><Button style={routerLinkToolbarStyles.Button}><PersonIcon /></Button></Link>
                            <Link to='/admindestination'><Button style={routerLinkToolbarStyles.Button}><LocationOnIcon /></Button></Link>
                            <Link to='admintrip'><Button style={routerLinkToolbarStyles.Button}><LanguageIcon /></Button></Link>
                        </Toolbar>
                        <Toolbar style={userToolbarStyles}>
                            {/* <IconButton edge='start' color='inherit' aria-label='menu'>
                                <MenuIcon />
                            </IconButton>
                            <IconButton edge='start' color='inherit' aria-label='menu'>
                                <PersonIcon />
                            </IconButton> */}
                            <Button color='primary' variant='contained' onClick={this.props.clearUserLogin}><PersonOutlineIcon /> Logout</Button>
                        </Toolbar>
                    </Toolbar>
                </AppBarStyles>
                {/* <div>
                    <p>
                        <Link to='/adminhome'>Admin Home</Link>
                        <Link to='/adminuser'>Admin User</Link>
                        <Link to='/admindestination'>Admin Destination</Link>
                        <Link to='admintrip'>Admin Trip</Link>
                    </p>
                </div> */}
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