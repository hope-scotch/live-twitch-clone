import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {

  // state = { isSignedIn: null }

  componentDidMount() {
    // A lot of application use the Google API Client Library -> hence adding ...apis.google.com/js/api.js only adds a load function to the 'window' on an object named 'gapi'
    // gapi.load('name_of_lib') -> name_of_lib can be used to specify the library and Google loads in the specific JS Code for that lib onto our app
    // The loading process is async, hence we use a callback -> On the callback we can perform further ops on the received object
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({ // Returns a promise
        clientId: '141701910733-9p68kgmjc4ig4ai54tpmnn05l6s6blpp.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        // This returns an object, on which we can use methods (signIn, isSignedIn, signOut) to manipulate or access login info
        this.auth = window.gapi.auth2.getAuthInstance() // We are storing a reference to the 'auth' object available on this.auth
        
        // To get the Present State
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() })
        this.onAuthChange(this.auth.isSignedIn.get())
        // To Update further states
        this.auth.isSignedIn.listen(this.onAuthChange)
      })
    })
  }

  // onAuthChange = () => {
  //   this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  // }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn)
      this.props.signIn(this.auth.currentUser.get().getId())
    else 
      this.props.signOut()
  }

  onSignInClick = () => {
    this.auth.signIn()
  }

  onSignOutClick = () => {
    this.auth.signOut()
  }

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null
    }
    else if (this.props.isSignedIn) {
      return (
        <button 
          className="ui red google button" 
          onClick={this.onSignOutClick}>
          <i className="google icon"></i>
          Sign Out
        </button>
      )
    } else {
      return (
        <button 
          className="ui green google button" 
          onClick={this.onSignInClick}>
          <i className="google icon"></i>
          Sign in with Google
        </button>
      )
    }
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    )
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth)