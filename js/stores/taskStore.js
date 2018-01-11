import { observable, action, useStrict } from 'mobx';
import api from '../api';

useStrict(true);

@observable token = null;

class Task {
  @observable selectedTask = {}
  @observable tasks = [];

  sync() {
    return api.tasks.get()
      .then(action('task sync', tasks => {
        this.tasks = tasks;
      }))
      .catch(error => {
        console.log(error);
      })
  }

  @action selectTask = (id) => {
    this.selectedTask = this.tasks.find(t => t.id === id);
  }
}

const singleton = new Task();
export default singleton;
