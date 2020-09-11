import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isEmpty, merge, includes, forIn, uniq } from "lodash";
import Authentication from "./auth/Authentication";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  componentDidUpdate(){
     if(this.props.user_status === "APPROVED"){
      this.props.history.push("/dashboard");
     }
  }

  handleSuccessfulAuth(data){
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  }


  render() {
    return (
      <div className="wrapper">
         <Authentication handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
