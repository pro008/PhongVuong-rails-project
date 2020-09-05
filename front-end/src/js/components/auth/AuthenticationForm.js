import React, { useState, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import asyncValidate from './asyncValidate';


const renderField = (
  { input, label, type, meta: { asyncValidating, touched, error } }
) => (
  <div className="inputGroup">
    <div className={asyncValidating ? 'async-validating' : ''}>
      <input className="registrationInput" {...input} type={type} placeholder={label}/>
      <i class="fa fa-envelope fa-lg fa-fw" aria-hidden="true"></i>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const AuthenticationForm = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  
  const [isLogin, setRegistry] = useState(true);
  useEffect(() => {props.change("ignoreConfirm",true)}, []);
  const handleRemoveField = (value) => {
    props.change("ignoreConfirm",value)
    setRegistry(value)
  }


  return (
    <div className="formContainer">
      <div className="regisHeader">
        <h3>{isLogin ? "Login" : "Register"}</h3>
      </div>

      <form className="registerForm" onSubmit={handleSubmit}>
        <Field
          name="user_name"
          type="text"
          component={renderField}
          label="Username"
        />

        <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
        />

        { !isLogin &&
          <Field
            name="confirm_password"
            type="password"
            component={renderField}
            label="Password Confirmation"
          />
        }

        <button className="submitButton" type="submit" disabled={submitting}>Submit</button>

        <div className="regisBottom">
          <button onClick={() => handleRemoveField(false)}>Register</button>
          <button onClick={() => handleRemoveField(true)}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'authForm', // a unique identifier for this form
  validate,
  asyncValidate,
  asyncBlurFields: [ 'user_name' ]
})(AuthenticationForm)
