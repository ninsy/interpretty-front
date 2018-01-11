import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer, PropTypes as MobxTypes } from 'mobx-react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import RegisterForm from './LoginForm';
import Binder from '../utils/binder';
import styles from './Login.css';

const binder = new Binder(RegisterForm);

@inject('authStore')
@observer
class Register extends React.Component {
  componentDidMount() {
    LoginForm.clear();
  }

  handleSubmit = (e) => {

  }

  render() {
    return (
      <div>
        <form>
          <TextField {...binder.bindInput('email')} type="text" />
          <TextField {...binder.bindInput('password')} type="password" />
          <TextField {...binder.bindInput('passwordRepeat')} type="password" />
          <RaisedButton type="submit" onClick={this.handleSubmit} />
        </form>
      </div>
    )
  }
}

Register.propTypes = {
  authStore: MobxTypes.observableObject
}

export default Register;
