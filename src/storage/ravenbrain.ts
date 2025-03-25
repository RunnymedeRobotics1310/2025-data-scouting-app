import { getJwt, getScoutName } from './util.ts';

const HOST = 'http://localhost:8080';
const KEY = 'abc123';

export async function rbfetch(
  urlpath: string,
  options: RequestInit,
): Promise<Response> {
  const o2: Record<string, unknown> = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwt()}`,
    },
  };
  o2.mode = 'cors';

  return fetch(HOST + urlpath, o2);
}

export async function authenticate() {
  const scoutName = getScoutName();
  if (scoutName === null) {
    throw new Error("Scout name not set. Can't authenticate to Raven Brain.");
  }
  const options: Record<string, unknown> = {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      username: scoutName,
      password: KEY,
    }),
  };
  // return fetch(HOST + `/api/auth`, options);
  return fetch(HOST + `/login`, options).then(response => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 401) {
      throw new Error('Not authorized (401)');
    } else {
      throw new Error('Unhandled server error (' + response.status + ')');
    }
  });
}
