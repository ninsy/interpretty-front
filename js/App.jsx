import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { inject, observer, PropTypes } from 'mobx-react';
import { observable, observe, action } from 'mobx';
import { Login } from './auth/Login';
import { Register } from './auth/register';
import Home from './Home';

@inject(
  'authStore'
)
@observer
class App extends React.Component {
  constructor(props) {
    super(props);

    this.disposer = observe(this.props.authStore, change => {
      if (change.name === 'token' && change.newValue) {
        this.syncAll();
      }
    });

    if (this.props.authStore.authenticated) {
      this.syncAll();
    }
  }

  componentDidMount() {
    this.props.authStore.checkToken();
  };

  componentWillUnmount() {
    this.disposer();
  };

  syncAll() {
    Promise.all([
      this.props.authStore.sync(),
    ])
    .then(action('stores synced', () => {
      this.storesSynced = true;
      console.log('Stores synced.');
    }))
    .catch(action('stores failed to sync', () => {
      this.storesSynced = true;
      console.log('FAILED to sync stores!');
    }));
  };

  @observable storesSynced = true;

  render() {
    return (
      <Provider {...tores}
    )



    if (!this.props.authStore.authenticated) {
      return (
        <div className="app">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={Login} />
          </Switch>
        </div>
      );
    }
    return (
      <div className="app">
        <Route path="/home" component={Home} />
      </div>
    );
  };

};

App.propTypes = {
  authStore: PropTypes.observableObject,
};

export default App;
