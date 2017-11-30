import { observable, action, useStrict } from 'mobx';
import api from '../api';

useStrict(true);

@observable token = null;

class Auth {

}

const singleton = new Auth();
export default singleton;
