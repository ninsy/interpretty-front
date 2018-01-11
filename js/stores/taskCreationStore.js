import { observable, action, useStrict } from 'mobx';
import api from '../api';

useStrict(true);

@observable token = null;

class TaskCreation {

}

const singleton = new TaskCreation();
export default singleton;
