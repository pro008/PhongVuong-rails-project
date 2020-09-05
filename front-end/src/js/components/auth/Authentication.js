import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isEmpty, merge, includes, forIn, uniq } from "lodash";
import  AuthenticationForm  from "./AuthenticationForm"
import { submitRegistration, submitLogin } from "../../actions/userAction";

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    if(!values.ignoreConfirm)
      this.props.submitRegistration({user: values})
    else
      this.props.submitLogin({user: values})
  }

  componentDidUpdate(){
    const { user, status } = this.props
    if (this.props.status == 200){
       this.props.handleSuccessfulAuth(user)
    }
  } 
 
  render() {
    return (
      <div className="registrationPage">
         <AuthenticationForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

// function mapStateToProps(state, ownProps) {
//   return {
//     locations: state.adGroup.ad_group.locations,
//     subCoordinates: state.adGroup.sub_coordinates,
//     customHeatMaps: state.adGroup.custom_heatmaps,
//     markers: state.adGroup.markers,
//     pending: state.adGroup.pending
//   }

// }

function mapStateToProps(state, ownProps) {
  return{
    fetching: state.UserReducer.fetching,
    status: state.UserReducer.status,
    message: state.UserReducer.message,
    user: state.UserReducer.user,
  };
}

function mapDispatchToProps(dispatch) {
 return bindActionCreators({ 
    submitRegistration,
    submitLogin
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
