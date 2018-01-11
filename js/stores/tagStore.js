import { observable, action, useStrict } from 'mobx';
import api from '../api';

useStrict(true);

@observable token = null;

class Tag {
  @observable tags = [];

  sync() {
    return api.tags.get()
      .then(action('task sync', tags => {
        this.tags = tags;
      }))
      .catch(error => {
        console.log(error);
      })
  }
}

const singleton = new Tag();
export default singleton;
