const validate = values => {
  const errors = {};
  let regex_username = /[^a-zA-Z0-9]/; // contains special character
  let regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // at least 1 uper 1 lower 1 number

  if(!values.user_name) {
    errors.user_name = 'Required';
  } else if(values.user_name.length <= 4 || values.user_name.length >= 16){
    errors.user_name = 'User Name should contain more than 4 and less than 16 characters';
  } else if(regex_username.test(values.user_name))
    errors.user_name = 'User Name should not contain special character';

  if(!values.password) {
    errors.password = 'Required';
  }else if(!regex_password.test(values.password))
    errors.password = 'Password should contain 1 uper 1 lower 1 number';

  if(!values.confirm_password && !values.ignoreConfirm){
    errors.password = 'Required';
  } else if(values.password != values.confirm_password){
    errors.confirm_password = 'Password and confirm Password does not match';
  }

  return errors;
};

export default validate;
