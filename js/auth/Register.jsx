import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer, PropTypes as MobxTypes } from 'mobx-react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

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
          <Input {...binder.bindInput('email')} type="text" />
          <Input {...binder.bindInput('password')} type="password" />
          <Input {...binder.bindInput('passwordRepeat')} type="password" />
          <Button type="submit" onClick={this.handleSubmit} />
        </form>
      </div>
    )
  }
}

export default Register;
