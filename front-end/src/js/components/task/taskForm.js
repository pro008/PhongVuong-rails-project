import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Row, Col, Button } from 'react-bootstrap';

const TaskForm = props => {
  const { handleSubmit, submitting } = props
  return (
    <form onSubmit={handleSubmit} className="taskForm">
      <Row>
        <Col md={4} className="taskTextCOntainer">
          <label>Task Name</label>
          <div>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder="Task Name"
            />
          </div>
        </Col>

        <Col md={2}>
          <Button type="submit" className="btn-primary">
            Submit
          </Button>
          
        </Col>
        
        <Col md={6}>
          <div>
            <div>
              <label>
                <Field name="urgent" component="input" type="radio" value='true' />{' '}
                Urgent
              </label>
              <label>
                <Field name="urgent" component="input" type="radio" value='false' />{' '}
                Not Urgent
              </label>
            </div>
          </div>
          <div>
            <div>
              <label>
                <Field name="important" component="input" type="radio" value='true' />{' '}
                Important
              </label>
              <label>
                <Field name="important" component="input" type="radio" value='false' />{' '}
                Not Important
              </label>
            </div>
          </div>
        </Col>
      </Row>
    </form>
  )
}

export default reduxForm({
  form: 'taskform'
})(TaskForm)