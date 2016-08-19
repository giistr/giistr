import { fromJS } from 'immutable';
import * as qs from 'qs';
import { get as getFromStorage } from './localStorage';

function makeUrl(endpoint: string): string {
  return `https://api.github.com/${endpoint}?`;
}

const shallowRequest = (method: string) => (
  method === 'GET' ||
  method === 'HEAD' ||
  method === 'REMOVE' ||
  method === 'DELETE'
);

export function request(method: string, endpoint: string, args: any, fullEndpoint?: string) {
  const shallow = shallowRequest(method);
  let body;

  if (!shallow) {
    body = JSON.stringify(args);
  }

  let url = fullEndpoint || makeUrl(endpoint);

  if (shallow) {
    url += qs.stringify(args);
  }

  let headers;
  if (getFromStorage('user')) {
    headers = new Headers({
      'Authorization': `token ${getFromStorage('user').access_token}`
    });
  } else {
    headers = new Headers();
  }

  const req = new Request(url, {
    method,
    headers,
    body
  });

  return fetch(req)
    .then(res => {
      if (res.status >= 400) {
        throw res;
      }

      return res.json();
    })
    .then(data => fromJS(data));
}

export function get(endpoint: string, args?: any, fullEndpoint?: string) {
  return request('GET', endpoint, args, fullEndpoint);
}

export function post(endpoint: string, args: any, fullEndpoint?: string) {
  return request('POST', endpoint, args, fullEndpoint);
}

export function put(endpoint: string, args: any) {
  return request('PUT', endpoint, args);
}

export function remove(endpoint: string, args: any) {
  return request('REMOVE', endpoint, args);
}

export default request;
