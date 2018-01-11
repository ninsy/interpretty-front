import { observable, action, useStrict } from 'mobx';
import api from '../api';

useStrict(true);

const API_KEY = 'interprettyToken';

@observable token = null;

class Auth {
  @action sync() {
    this.token = localStorage.getItem(API_KEY)
  }
  @action setToken(token) {
    this.token = token;
    localStorage.setItem(API_KEY, this.token);
  }
}

const singleton = new Auth();
export default singleton;
