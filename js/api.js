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

function secureJSON(route, method, payload, headers) {
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

export {
  request,
  secureRequest,
  secureJSON,
}
