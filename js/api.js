import _ from 'lodash';

import authStore from '../stores/authStore';

function request(route, method, payload, headers) {
  return fetch(
    route,
    method,
    payload,
    _.merge(
      {
        "Content-Type": "application/json"
      },
      headers,
    )
  )
    .then(checkErrors);
}

function secureRequest(route, method, payload, headers) {
  return request(
    route,
    method,
    payload,
    _.merge(
      headers,
      {
        'Authorization': `Bearer ${authStore.token}`
      },
    ));
}

function requestJSON(route, method, payload, headers) {
  return request(
    route,
    method,
    payload,
    headers
  )
    .then(handleJSON);
}

function secureJSON(route, method = 'GET', payload, headers) {
  return secureRequest(
    route,
    method,
    payload,
    headers
  )
    .then(handleJSON);
}

function handleJSON(response) {
  return response.text()
    .then(text => {
      return JSON.parse(text);
    });
}

function checkErrors(response) {
  if (!response.ok) {

    if(response.status === 401) {
      window.localStorage.removeItem('interpretty-token');
      location.reload(true);
      return Promise.reject(err);
    }

    const err = new Error(response.statusText)
    err.payload = response.text;
    return Promise.reject(err);
  }
  return Promise.resolve(response);
}

class TagEndpoint extends BaseEndpoint{
  constructor() {
    super('/api/tags')
  }
}

class TaskEndpoint extends BaseEndpoint{
  constructor() {
    super('/api/tasks')
  }
}

class TestEndpoint extends BaseEndpoint {
  constructor() {
    super('/api/tests')
  }
}

class BaseEndpoint {
  constructor(route) {
    this.route = route;
  }
  get() {
    return secureJSON(this.route);
  }

  post(payload) {
    return secureJSON(this.route, 'POST', payload);
  }

  put(payload) {
    return secureJSON(this.route, 'PUT', payload);
  }

  delete() {
    return secureJSON(this.route, 'DELETE', payload);
  }
}

class Api {
  constructor() {
    this.tasks = new TaskEndpoint();
    this.tags = new TagEndpoint();
  }

  login(payload) {
    return requestJSON('/api/login', 'POST', payload);
  }

  register(payload) {
    return requestJSON('/api/register', 'POST', payload);
  }
}

const singleton = new Api();
export default singleton;
