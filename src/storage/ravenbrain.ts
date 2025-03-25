import { getScoutName } from './util.ts';

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
      Authorization: `Bearer ${KEY}`,
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
  return fetch(HOST + `/api/auth`, options);
}
