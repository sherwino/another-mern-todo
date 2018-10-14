import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state={
            usernameInput: '',
            passwordInput: '',
            loginUser: '',
            loginPassword: '',
            loggedInUser: null,
          }
    }
    
    submitForm = (event, theUri) => {
        event.preventDefault();

        const url = `http://localhost:5000/api/${theUri}`;
        const header = { withCredentials: true};
        const body = {}
        
        if (theUri === "signup") {
          body.username = this.state.usernameInput;
          body.password = this.state.passwordInput;
        } else if (theUri === "login") {
          body.username = this.state.loginUser;
          body.password = this.state.loginPassword;
        }
    
        axios.post(url, body, header).then((response) => {

          this.setState({
            usernameInput: '', 
            passwordInput: '',
            loginUser: '',
            loginPassword: '',
          })

          this.props.passTheUserToApp(response.data)
        }).catch((error) => {
          console.log(error)
        })
      }

    updateInput = (theEvent) => {
        const { name, value } = theEvent.target;
        this.setState({[name]: value});
      }

    render() {
        return (
            <div className="auth">
                <form onSubmit={e => this.submitForm(e, 'signup')}>
                    <h2>Sign Up</h2>
                    <label>Username</label>
                    <input type="text" name="usernameInput" value={this.state.usernameInput} onChange={this.updateInput}/>
                    <label>Password</label>
                    <input type="text" name="passwordInput" value={this.state.passwordInput} onChange={this.updateInput}/>
                    <button className="auth-button">Create User</button>
                </form>

                <form onSubmit={e => this.submitForm(e, 'login')}>
                    <h2>Log In</h2>
                    <label>Username</label>
                    <input type="text" name="loginUser" value={this.state.loginUser} onChange={this.updateInput}/>
                    <label>Password</label>
                    <input type="text" name="loginPassword" value={this.state.loginPassword} onChange={this.updateInput}/>
                    <button className="auth-button">Log In</button>
                </form>
            </div>
        )
    }
}

export default Auth;