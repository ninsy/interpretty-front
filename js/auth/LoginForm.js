import MobxReactForm from 'mobx-react-form';
import validator from 'validator';

const fields = {
  email: {
    label: 'E-mail accont address',
    validators: []
  },
  password: {
    label: 'Password',
    valdators: []
  }
}

class LoginForm extends MobxReactForm {}

export default new LoginForm({ fields }, { vjf: validator });
