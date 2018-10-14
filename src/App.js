import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Auth from './Auth'
import TaskList from './TaskList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      loggedInUser: null,
    }
  }

  componentDidMount() {
    this.fetchUser();
  }
  
  fetchUser = () => {
    const url = 'http://localhost:5000/api/loggedin';
    const header = { withCredentials: true};

    axios.get(url, header)
    .then((theResponse) => {

      this.setState({ loggedInUser: theResponse.data})

    }).catch((err) => {
      console.log(err)
    });
  }

  logout = () => {
    const url = "http://localhost:5000/api/logout";
    const body = {};
    const header = { withCredentials: true};
    
    axios.post(url, body, header)
    .then(() => {
      this.setState({ loggedInUser: null})
    })
  }

  setUserInState = (userObject) => {
    this.setState({loggedInUser: userObject})
  }

  render() {
    return (
      <div className="App">
        {this.state.loggedInUser && <h3>Welcome, {this.state.loggedInUser.username}</h3>}
        <nav>
        <Link className="link" to={"/auth"}>Login / Sign Up</Link>
        <Link className="link" to={"/tasks"}>Task List</Link>
        {this.state.loggedInUser && <button className="logout" onClick={this.logout}> Logout</button>}
        </nav>
        <Switch>
          <Route path="/auth" render={props => <Auth {...props} passTheUserToApp={this.setUserInState} /> } />
          <Route path="/tasks" component={TaskList} /> 
        </Switch>
      </div>
    );
  }
}

export default App;
