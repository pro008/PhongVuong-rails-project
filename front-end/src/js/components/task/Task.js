import React, { Component } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeProgress, changePriority, deleteTask } from "../../actions/taskAction";
import { isEmpty } from "lodash";

const Progress = {open: 'Open', start: 'Start', in_progress: 'In Progress', done: 'Done', close: 'Close'}
const Priority = {important: 'Important', urgent: 'Urgent', important_and_urgent: 'Important Urgent'}
const NextProgress = {open: Progress['start'], start: Progress['in_progress'],
                     in_progress: Progress['done'], done: Progress['close'], close: ''}
const styleButton ={'Open': 'btn-info', 'Start': 'btn-light', 'In Progress': 'btn-success',
                    'Done': 'btn-primary', 'Close': 'btn-secondary'}


class Task extends Component {
   constructor(props) {
    super(props);
    this.state = {
      task_id: props.data.id,
      task: props.data,
    };

    this.handleChangeProgress = this.handleChangeProgress.bind(this);
    this.handleChangePriority = this.handleChangePriority.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if(!_.isEmpty(props.task) &&  props.task.id == state.task.id){
     return {
        task: props.task,
      }
    }

    return(null)
  }

  handleChangeProgress(progress){
    this.props.changeProgress(this.state.task_id, progress);
  }

  handleChangePriority(priority){
    this.props.changePriority(this.state.task_id, priority);
  }

  handleDeleteTask(){
    this.props.deleteTask(this.state.task_id, this.props.index)
  }

  currentProgress(text, progress){
    return(
      <div className="currentState">
        <p>{text}</p>
        <span className={styleButton[Progress[progress]]}>{Progress[progress]}</span>
      </div>
    )
  }

  nextProgressButton(progress){
    let current_progress = progress
    return(
      <div className="progressGroup">
        <Button 
          className={styleButton[NextProgress[progress]]}
          onClick={() => this.handleChangeProgress(progress)}
        >{NextProgress[progress]}</Button>
      </div>
    )
  }

  priorityButton(priority){
    let classImportant = (priority == null || !Priority[priority].includes("Important") ? "btn-outline-danger" : "btn-danger")
    let classUrgent = (priority == null || !Priority[priority].includes("Urgent") ? "btn-outline-warning" : "btn-warning")
    
    return (
      <div className="priorityGroup">
        <Button 
          className={classImportant}
          onClick={() => this.handleChangePriority('important')}
        >{Priority['important']}</Button>
        <Button 
          className={classUrgent}
          onClick={() =>this.handleChangePriority('urgent')}
         >{Priority['urgent']}</Button>
      </div>
    )
  }

  render() {
    const { task } = this.state;

    if(task.deleted)
      return(<div></div>)

    return (
      <Row className="taskItem">
        <Col md={5}>{this.currentProgress(task.name, task.progress)}</Col>
        <Col md={3}>{this.priorityButton(task.priority)}</Col>
        <Col md={3}>{this.nextProgressButton(task.progress)}</Col>
        <Col md={1}>
          <Button 
            className="btn btn-delete"
            onClick={() =>this.handleDeleteTask()}>
          X</Button></Col>
      </Row>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    task: state.TaskReducer.task,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeProgress,
      changePriority,
      deleteTask,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);