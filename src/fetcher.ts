import * as qs from 'qs';
import { fromJS } from 'immutable';

function makeUrl(endpoint: string): string {
  return `https://api.github.com/${endpoint}`;
}

const baseHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const shallowRequest = (method: string) => (
  method === 'GET' ||
  method === 'REMOVE' ||
  method === 'DELETE'
);

export function request(method: string, endpoint: string, args: any) {
  const shallow = shallowRequest(method);
  const body = !shallow && args;
  let url = makeUrl(endpoint);

  if (shallow) {
    url += '?' + qs.stringify(args);
  }

  return fetch(url, {
    headers: {
      ...baseHeaders
    },
    body,
    method,
    mode: 'cors'
  })
  .then(res => {
    if (res.status >= 400) {
      throw res;
    }

    return res.json();
  })
  .then(data => fromJS(data));
}

export function get(endpoint: string, args: any) {
 return request('GET', endpoint, args);
}

export function post(endpoint: string, args: any) {
 return request('POST', endpoint, args);
}

export function put(endpoint: string, args: any) {
 return request('PUT', endpoint, args);
}

export function remove(endpoint: string, args: any) {
 return request('REMOVE', endpoint, args);
}

export default request;