import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./styles/main.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userStatus, userLogout } from "../actions/userAction";
import Home from "./Home";
import Dashboard from "./Dashboard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(data){
    this.setState({
      user: data
    });
  }

  handleLogout(){
    this.props.userLogout();
    this.setState({ user: {} })
  }

  componentDidMount(){
    this.props.userStatus();
    this.setState({ user: this.props.user })
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route 
              exact 
              path={"/"}
              render={props =>(
                <Home {...props} 
                      handleLogin={this.handleLogin} 
                      loggedInStatus={this.props.loginStatus}
                      loaded_user={this.props.loaded_user}
                      user={this.state.user}
                />
              )}
             />
            <Route 
              exact 
              path={"/dashboard"} 
              render={props =>(
                <Dashboard {...props} 
                            loggedInStatus={this.props.loginStatus}
                            handleLogout={this.handleLogout}
                            user={this.state.user}
                            loaded_user={this.props.loaded_user}
                />
              )} />
          </Switch>
        </Router>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    user: state.UserReducer.user,
    loginStatus: state.UserReducer.loginStatus,
    loaded_user: state.UserReducer.checkUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      userStatus,
      userLogout,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
