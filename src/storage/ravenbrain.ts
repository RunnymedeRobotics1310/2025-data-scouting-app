import { getJwt, getScoutName } from './util.ts';
import { useEffect, useState } from 'react';

const HOST = 'http://localhost:8080';
const KEY = 'abc123';

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

export async function ping(): Promise<boolean> {
  return fetch(HOST + '/api/ping', {}).then(resp => {
    return resp.ok;
  });
}

/**
 * Fetch with Raven Brain authentication
 * @param urlpath
 * @param options
 */
async function rbfetch(
  urlpath: string,
  options: RequestInit,
): Promise<Response> {
  const o2: Record<string, unknown> = {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwt()}`,
    },
  };
  o2.mode = 'cors';

  return fetch(HOST + urlpath, o2);
}

export async function validate(): Promise<boolean> {
  return rbfetch('/api/validate', {}).then(resp => {
    return resp.ok;
  });
}

export function useTournamentList() {
  const [list, setList] = useState([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    rbfetch('/api/tournament', {}).then(resp => {
      if (resp.ok) {
        resp.json().then(data => {
          setList(data);
          setLoading(false);
        });
      } else {
        setError('Failed to fetch tournaments');
        setLoading(false);
      }
    });
  }, []);

  return { list, error, loading };
}

export async function saveTournament(tournament: any) {
  return rbfetch('/api/tournament', {
    method: 'POST',
    body: JSON.stringify(tournament),
  }).then(resp => {
    return resp.ok;
  });
}

export function useSchedule(tournamentId: string) {
  const [matches, setSchedule] = useState([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    rbfetch('/api/schedule/' + tournamentId, {}).then(resp => {
      if (resp.ok) {
        resp.json().then(data => {
          setSchedule(data);
          setLoading(false);
        });
      } else {
        setError('Failed to fetch schedule');
        setLoading(false);
      }
    });
  }, [loading]);

  return { matches, error, loading };
}

export async function saveMatch(match) {
  return rbfetch('/api/schedule', {
    method: 'POST',
    body: JSON.stringify(match),
  }).then(resp => {
    return resp.ok;
  });
}
