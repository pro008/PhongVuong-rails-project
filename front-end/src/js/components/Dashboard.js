import React, { Component } from "react";
import { Row, Col, Button } from 'react-bootstrap'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isEmpty } from "lodash";
import { fetchTasks, createTask } from "../actions/taskAction";
import  Task  from "./task/Task";
import  TaskForm  from "./task/taskForm";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.fetchTasks();
  }


  handleLogoutClick(){
    this.props.handleLogout();
    this.props.history.push("/");
  }

  handleSubmit(values){
  	let priority = null;
  	if(values.urgent == "true" && values.important == "true")
  		priority = 'important_and_urgent'
  	else if(values.urgent == "true")
  		priority = 'urgent'
  	else if(values.important == "true")
  		priority = 'important'

  	this.props.createTask({task: {name: values.name, priority: priority}})
  }

  headerTask(){
  	return(
  		<Row className="cart-column">
        <Col md={5}><b>Name</b></Col>
        <Col md={3}><b>Priority</b></Col>
        <Col md={3}><b>Progress</b></Col>
        <Col md={1}><b></b></Col>
      </Row>
  	)
  }

  taskContainer(){
  	const { tasks } = this.props

  	if(_.isEmpty(tasks))
  		return(<div></div>)

  	return(
	  	<div className="taskContainer">
	      {this.headerTask()}
	      { tasks.map( (task, index) => (
	          <Task
	          	key={task.id}
	          	index ={index}
	            data={task}
	          />
	        ))
	      }
	    </div>
    )
  }

  render() {
  	const { user, tasks } = this.props
    return (
      <div className="wrapper">
        {this.taskContainer()}

        <TaskForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
  	user: state.UserReducer.user,
  	tasks: state.TaskReducer.tasks,
  	fetching: state.TaskReducer.tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTasks,
      createTask,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
