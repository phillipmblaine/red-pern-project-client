import React from 'react';
import './App.css';
import Auth from './auth/Auth';
// admin role access pages
import AdminNavbar from './site/AdminNavbar'
import AdminHome from './site/AdminHome';
// user role access pages
import UserNavbar from './site/UserNavbar';
import Header from './site/Header';
import Home from './site/Home';
import Footer from './site/Footer';

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
    // this.clearToken()
  }

  componentDidUpdate() {
    console.log('App,tsx -> componentDidUpdate.')
    console.log('Current App.tsx state:', this.state)
  }

  componentWillUnmount() {
    console.log('App.tsx -> componentWillUnmount.')
  }

  // assignToken = () => {
  //   if (localStorage.getItem('token')) {
  //     this.setState({
  //       sessionToken: localStorage.getItem('token')
  //     })
  //   }
  // }

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken)
    this.setState({
      sessionToken: newToken
    })
    // console.log(this.state.sessionToken)
  }

  updateRole = (newRole: string) => {
    this.setState({
      role: newRole
    })
  }

  clearUserLogin = () => {
    localStorage.clear();
    this.setState({
      sessionToken: '',
      role: ''
    })
  }

  // clearToken = () => {
  //   localStorage.clear();
  //   this.setState({
  //     sessionToken: ''
  //   })
  // }

  // clearRole = () => {
  //   this.setState({
  //     role: ''
  //   })
  // }

  protectedViews = () => {
    return (
      this.state.sessionToken === localStorage.getItem('token')
        ? (
          this.state.role === 'admin'
            ? (
              <div>
                <AdminNavbar
                  clearUserLogin={this.clearUserLogin}
                />
                <AdminHome />
              </div>
            )
            : (
              <div>
                <p>Login success.Access granted.</p >
                <UserNavbar
                  clearUserLogin={this.clearUserLogin}
                // clearToken={this.clearToken}
                // clearRole={this.clearRole}
                />
                <Header />
                <Home />
                <Footer />
              </div >
            )
        )
        : (
          <div>
            <p>Please login.</p>
            <Auth
              updateToken={this.updateToken}
              updateRole={this.updateRole} />
          </div>
        )
    )
  }

  render() {
    return (
      <div className='App'>
        {/* <button onClick={() => { this.setState({ sessionToken: 'abcde' }) }}>Set sessionToken to a value.</button>
        <button onClick={() => { this.setState({ sessionToken: undefined }) }}>Set sessionToken to undefined.</button> */}
        <h2>Hello from App.tsx</h2>
        <h6>Current role: <span>{this.state.role === ''
          ? 'No user role.'
          : this.state.role}</span></h6>
        {/* {
          this.state.sessionToken !== undefined
            ? <h4>Access Granted.</h4>
            : <Auth />
        } */}
        {this.protectedViews()}
        {/* <h6>Current user token: <span>{this.state.sessionToken === ''
          ? 'No user token.'
          : this.state.sessionToken}</span></h6>
        <h6>Local storage token: <span>{localStorage.getItem('token') === null
          ? 'No local storage token.'
          : localStorage.getItem('token')}</span></h6> */}
      </div >
    )
  }
}

export default App;