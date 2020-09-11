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

import Header from "./layout/Header";
import ProtectedRoute from "./layout/ProtectedRoute";
import Home from "./Home";
import Dashboard from "./Dashboard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      user_status: "PENDING",
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.loginStatus == "LOGOUT")
      return{user: {}, user_status: "LOGOUT"}
    else if (!_.isEmpty(props.user) || !_.isEmpty(state.user)){
      return{
        user: props.user,
        user_status: "APPROVED"
      }
    } else if (props.loginStatus == "FAILED") {
      return{ user_status: "REJECTED" }
    }

    return null;
  }

  componentDidMount(){
    this.props.userStatus();
  }

  handleLogin(data){
    this.setState({
      user: data
    });
  }

  handleLogout(){
    this.props.userLogout();
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Header 
            handleLogout={this.handleLogout}
            user={this.state.user}
          />
          <Switch>
            <Route 
              exact 
              path={"/"}
              render={props =>(
                <Home {...props} 
                      handleLogin={this.handleLogin} 
                      user_status={this.state.user_status}
                      user={this.state.user}
                />
              )}
             />

            <ProtectedRoute 
              exact 
              path={"/dashboard"}
              user_status={this.state.user_status}
              user={this.state.user}
              component={Dashboard}
            />
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
