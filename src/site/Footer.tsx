import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './Footer.css';
import HomeIcon from '@material-ui/icons/Home';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { AppBar, Button, Toolbar } from '@material-ui/core';

type FooterState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
    clearUserLogin: () => void;
}

class Footer extends React.Component<AcceptedProps, FooterState>{
    render() {
        return (
            <div className='footerMainDiv'>
                {/* <h2>Hello from Footer.tsx</h2> */}
                {/* <AppBar className='footerAppBar' position='fixed'>
                    <Toolbar>
                        <Toolbar>
                            <Link to='/userhome'><Button><HomeIcon /></Button></Link>
                            <Link to='/userdestination'><Button><LocationOnIcon /></Button></Link>
                            <Link to='usertrip'><Button><LanguageIcon /></Button></Link>
                        </Toolbar>
                        <Toolbar>
                            <Button variant='contained' onClick={this.props.clearUserLogin}><PersonOutlineIcon /> Logout</Button>
                        </Toolbar>
                    </Toolbar>
                </AppBar> */}
            </div>
        )
    }
}

export default Footer;