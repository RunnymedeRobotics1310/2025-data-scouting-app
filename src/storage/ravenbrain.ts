import {
  getJwt,
  getPassword,
  getScoutName,
  saveJwt,
  saveRoles,
  saveScoutName,
} from './local.ts';
import { useEffect, useState } from 'react';
import { GameEvent } from '../types/GameEvent.ts';
import { QuickComment } from '../types/QuickComment.ts';
import { ScheduleItem } from '../types/ScheduleItem.ts';

const HOST = 'http://localhost:8080';

export async function authenticate() {
  const scoutName = getScoutName();
  const password = getPassword();
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
      password: password,
    }),
  };
  return fetch(HOST + `/login`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401) {
        throw new Error('Not authorized (401)');
      } else {
        throw new Error('Unhandled server error (' + response.status + ')');
      }
    })
    .then(json => {
      saveJwt(json.access_token);
      const payload = parseJwt(json.access_token);
      saveScoutName(payload.sub);
      saveRoles(payload.roles);
      return true;
    });
}
function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );
  return JSON.parse(jsonPayload);
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

export async function validate(): Promise<string> {
  return rbfetch('/api/validate', {})
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw Error('Not authorized (401)');
      } else {
        throw Error('Unhandled server error (' + resp.status + ')');
      }
    })
    .then(json => {
      return json.role;
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

  return { list, error, loading } as {
    list: RBTournament[];
    error: string | null;
    loading: boolean;
  };
}

export type RBTournament = {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
};

export async function saveTournament(tournament: RBTournament) {
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
  }, [tournamentId, loading]);

  return { matches, error, loading } as {
    matches: ScheduleItem[];
    error: string | null;
    loading: boolean;
  };
}

export type RBScheduleItem = {
  tournamentId: string;
  match: number;
  red1: number;
  red2: number;
  red3: number;
  blue1: number;
  blue2: number;
  blue3: number;
};

export async function saveMatch(match: RBScheduleItem) {
  return rbfetch('/api/schedule', {
    method: 'POST',
    body: JSON.stringify(match),
  }).then(resp => {
    return resp.ok;
  });
}

export type RBGameEvent = {
  timestamp: Date;
  scoutName: string;
  tournamentId: string;
  matchId: number;
  alliance: string;
  teamNumber: number;
  eventType: string;
  amount: number;
  note: string;
};
export type RBGameEventResponse = {
  success: boolean;
  reason: string;
  eventLogRecord: RBGameEvent;
};
export async function saveEvents(
  events: GameEvent[],
): Promise<RBGameEventResponse[]> {
  const rbEvents: RBGameEvent[] = [];
  for (const e of events) {
    const rbe: RBGameEvent = {
      timestamp: e.timestamp,
      scoutName: e.scoutName,
      tournamentId: e.tournamentId,
      matchId: e.matchId,
      alliance: e.alliance,
      teamNumber: e.teamNumber,
      eventType: e.eventType,
      amount: e.amount,
      note: e.note ? e.note : '',
    };
    if (
      rbe.scoutName &&
      rbe.scoutName !== '' &&
      rbe.tournamentId &&
      rbe.tournamentId !== '' &&
      rbe.matchId > 0 &&
      (rbe.alliance === 'red' || rbe.alliance === 'blue') &&
      rbe.teamNumber > 0 &&
      rbe.eventType &&
      rbe.eventType !== '' &&
      rbe.amount > -1
    ) {
      rbEvents.push(rbe);
    }
  }

  return rbfetch('/api/event', {
    method: 'POST',
    body: JSON.stringify(rbEvents),
  })
    .then(resp => {
      return resp.json();
    })
    .catch(error => {
      console.error('Error saving events', error);
      return false;
    });
}

export type QuickCommentResponse = {
  comment: QuickComment;
  success: boolean;
  reason: string | null;
};
export async function saveQuickComments(
  comments: QuickComment[],
): Promise<QuickCommentResponse[]> {
  return rbfetch('/api/quickcomment', {
    method: 'POST',
    body: JSON.stringify(comments),
  }).then(resp => {
    return resp.json();
  });
}
