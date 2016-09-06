import { fromJS } from 'immutable';
import * as qs from 'qs';
import { get as getFromStorage } from './localStorage';

const config = fromJS(require('!json!./config.json')); // tslint:disable-line

function makeUrl(endpoint: string): string {
  return `${config.get('mainUrl')}/${endpoint}?`;
}

const shallowRequest = (method: string) => (
  method === 'GET' ||
  method === 'HEAD' ||
  method === 'REMOVE' ||
  method === 'DELETE'
);

export function request(method: string, endpoint: string, args: any, fullEndpoint?: string, preventBody?: Boolean) {
  const shallow = shallowRequest(method);
  let body;
  let url = fullEndpoint || makeUrl(endpoint);

  if (!shallow && !preventBody) {
    body = JSON.stringify(args);
  }

  if (shallow || preventBody) {
    url += qs.stringify(args);
  }

  let rawHeader: { [index: string]: string; } = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Charset': 'utf-8'
  };

  if (getFromStorage('user')) {
    rawHeader = Object.assign({}, rawHeader, {
      Authorization: `token ${getFromStorage('user').access_token}`
    });
  }

  const headers = new Headers(rawHeader);

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

      return Promise.all([
        res.json(),
        Promise.resolve(res.headers)
      ]);
    })
    .then(x => {
      const res = fromJS(x[0]);
      return preventBody ? x[1].get('link') : res;
    });
}

export function get(endpoint: string, args?: any, fullEndpoint?: string, resHeader?: boolean) {
  return request('GET', endpoint, args, fullEndpoint, resHeader);
}

export function post(endpoint: string, args: any, fullEndpoint?: string, preventBody?: boolean) {
  return request('POST', endpoint, args, fullEndpoint, preventBody);
}

export function put(endpoint: string, args: any) {
  return request('PUT', endpoint, args);
}

export function remove(endpoint: string, args: any) {
  return request('REMOVE', endpoint, args);
}

export default request;
