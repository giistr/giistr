import { fromJS } from 'immutable';
import * as qs from 'qs';
import { get as getFromStorage } from './localStorage';
import { Observable } from 'rxjs';
import { config } from './config';

interface Args {
  endpoint?: string;
  params?: Object;
  fullEndpoint?: string;
  resHeader?: boolean;
  preventBody?: boolean;
}

interface ReqArgs extends Args {
  method: string;
}

function makeUrl(endpoint: string, url?: string): string {
  const base = url || config.get('mainUrl');
  return endpoint ? base + `/${endpoint}?` : base + '?';
}

const shallowRequest = (method: string) =>
  method === 'GET' ||
  method === 'HEAD' ||
  method === 'REMOVE' ||
  method === 'DELETE';

export function request(args: ReqArgs) {
  const shallow = shallowRequest(args.method);
  let body;
  let url = makeUrl(args.endpoint, args.fullEndpoint);

  if (!shallow && !args.preventBody) {
    body = JSON.stringify(args);
  }

  if (shallow || args.preventBody) {
    url += qs.stringify(args.params);
  }

  let rawHeader: { [index: string]: string } = {
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
    method: args.method,
    headers,
    body
  });

  return (Observable as any).fromPromise(
    fetch(req)
      .then(res => {
        if (res.status >= 400) {
          throw res;
        }

        return Promise.all([res.json(), Promise.resolve(res.headers)]);
      })
      .then(x => {
        const res = fromJS(x[0]);
        return args.resHeader ? x[1] : res;
      })
  );
}

export function get(args: Args) {
  return request(Object.assign({}, args, { method: 'GET' }));
}

export function post(args: Args) {
  return request(Object.assign({}, args, { method: 'POST' }));
}

export function put(args: Args) {
  return request(Object.assign({}, args, { method: 'PUT' }));
}

export function remove(args: Args) {
  return request(Object.assign({}, args, { method: 'DELETE' }));
}

export default request;
