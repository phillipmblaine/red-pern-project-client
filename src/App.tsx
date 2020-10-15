import React from 'react';
import './App.css';
import Auth from './auth/Auth';
import AdminNavbar from './site/AdminNavbar'
import { BrowserRouter as AdminRouter } from 'react-router-dom';
import { BrowserRouter as UserRouter } from 'react-router-dom';
import { BrowserRouter as FooterRouter } from 'react-router-dom';
import { BrowserRouter as AuthRouter } from 'react-router-dom';
import UserNavbar from './site/UserNavbar';
import Footer from './site/Footer';
import { Toolbar } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

type AppState = {
  sessionToken: string | undefined;
  role: string;
}

type AcceptedProps = {}

class App extends React.Component<AcceptedProps, AppState> {
  constructor(props: AcceptedProps) {
    super(props)
    this.state = {
      sessionToken: undefined,
      role: ''
    }
  }

  componentDidMount() {
    console.log('App.tsx -> componentDidMount.')
    this.clearUserLogin()
  }

  componentDidUpdate() { console.log('App.tsx -> componentDidUpdate.') }

  componentWillUnmount() { console.log('App.tsx -> componentWillUnmount.') }

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken)
    this.setState({ sessionToken: newToken })
  }

  updateRole = (newRole: string) => { this.setState({ role: newRole }) }

  clearUserLogin = () => {
    localStorage.clear();
    this.setState({
      sessionToken: '',
      role: ''
    })
  }


  protectedViews = () => {
    return (
      this.state.sessionToken === localStorage.getItem('token')
        ? (
          this.state.role === 'admin'
            ? (
              <div>
                <AdminRouter>
                  <AdminNavbar
                    role={this.state.role}
                    sessionToken={this.state.sessionToken}
                    clearUserLogin={this.clearUserLogin}
                  />
                </AdminRouter>
                {/* <FooterRouter>
                  <Footer
                    sessionToken={this.state.sessionToken}
                    clearUserLogin={this.clearUserLogin}
                  />
                </FooterRouter> */}
              </div>
            ) : (
              <div>
                <UserRouter>
                  <UserNavbar
                    sessionToken={this.state.sessionToken}
                    clearUserLogin={this.clearUserLogin}
                  />
                </UserRouter>
                {/* <FooterRouter>
                  <Footer
                    sessionToken={this.state.sessionToken}
                    clearUserLogin={this.clearUserLogin}
                  />
                </FooterRouter> */}
              </div >
            )
        ) : (
          <div>
            <AuthRouter>
              <Auth
                sessionToken={this.state.sessionToken}
                role={this.state.role}
                updateToken={this.updateToken}
                updateRole={this.updateRole} />
            </AuthRouter>
          </div>
        )
    )
  }

  render() {
    return (
      <div className='App'>
        {
          this.state.role === 'admin' && this.state.sessionToken !== undefined
            ? <Redirect to='/adminhome' /> : <Redirect to='/' />
        }
        <Toolbar />
        {this.protectedViews()}
        
        <FooterRouter>
          <Footer
            sessionToken={this.state.sessionToken}
            clearUserLogin={this.clearUserLogin}
          />
        </FooterRouter>
      </div >
    )
  }
}

export default App;