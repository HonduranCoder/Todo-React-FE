import { Component } from 'react';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import HomePage from './HomePage.js';
import SignupPage from './SignupPage.js';
import LoginPage from './LoginPage.js'; 
import TodoPage from './TodoPage.js';

import './App.css';

const TOKEN_KEY = 'TOKEN';
class App extends Component {
  state = {
    token: localStorage.getItem(TOKEN_KEY) || ''
  }

  handleTokenChange = token => {
    localStorage.setItem(TOKEN_KEY, token);
    this.setState({ token: token });
  }

  logout = () => {
    localStorage.clear();
    this.setState({ token: '' });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <header className = "header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink exact activeClassName="active" to="/signup">Signup</NavLink>
            <NavLink exact activeClassName="active" to="/login">Login</NavLink>
            <NavLink exact activeClassName="active" to="/todos">Todos</NavLink>
            {this.state.token && <button onClick={this.logout}>Logout</button>}          
          </header>
          <Switch>
            <Route path="/" exact
              render={routerProps => (
                <HomePage {...routerProps}/>
              )}
            />

            <Route path="/signup" exact
              render={routerProps => (
                <SignupPage {...routerProps}/>
              )}
            />

            <Route path="/login" exact
              render={routerProps => (
                <LoginPage handleTokenChange = {this.handleTokenChange} {...routerProps}/>
              )}
            />

            <Route path="/todos" exact
              render={routerProps => (
                this.state.token
                  ? <TodoPage token={this.state.token}
                    {...routerProps}/>
                  : <Redirect to="/" />
              )}
            />
          </Switch>
          <Footer/>
        </Router>
      </div>
    );
  }

}

export default App;
