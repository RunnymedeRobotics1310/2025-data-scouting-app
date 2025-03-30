import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { equalsIgnoreSync, GameEvent } from '../types/GameEvent.ts';
import { GameEvents } from '../types/GameEvents.ts';
import { Tournament } from '../types/Tournament.ts';
import { Phase } from '../common/phase.ts';
import { useEffect, useState } from 'react';
import { QuickComment } from '../types/QuickComment.ts';

export function parseKey(keyString: string): ScoutingSessionId {
  const arr = keyString.split('|');
  const key: ScoutingSessionId = {
    tournamentId: arr[0],
    scoutName: arr[1],
    matchId: parseInt(arr[2]),
    alliance: arr[3],
    teamNumber: parseInt(arr[4]),
  };
  return key;
}

export function stringifyKey(obj: ScoutingSessionId): string {
  // console.log('Stringifying: ', obj);

  return (
    '' +
    obj.tournamentId +
    '|' +
    obj.scoutName +
    '|' +
    obj.matchId +
    '|' +
    obj.alliance +
    '|' +
    obj.teamNumber
  );
}

export function addDefenceEndedEvent(
  scoutingSessionId: ScoutingSessionId,
  phase: Phase,
  note: string = '',
) {
  const endMillis = new Date().getTime();
  const start = readLatestEvent(scoutingSessionId, phase, 'defence-started');
  if (start) {
    const startMillis = start.timestamp.getTime();
    const elapsedSeconds = (endMillis - startMillis) / 1000;
    addEventWithAmount(
      scoutingSessionId,
      phase,
      'defence-stopped',
      elapsedSeconds,
      note,
    );
  } else {
    addEvent(scoutingSessionId, phase, 'defence-stopped', note);
  }
}
export function saveScoutName(name: string) {
  localStorage.setItem('rrScoutName', name);
}
export function getScoutName() {
  return localStorage.getItem('rrScoutName');
}
export function saveJwt(jwt: string) {
  localStorage.setItem('rrJwt', jwt);
}
export function getJwt() {
  return localStorage.getItem('rrJwt');
}
export function saveRoles(roles: string[]) {
  localStorage.setItem('rrRoles', JSON.stringify(roles));
}
export function clearRoles() {
  localStorage.removeItem('rrRoles');
}
function getRoles() {
  const r = localStorage.getItem('rrRoles');
  if (r === null || r === '') {
    return null;
  } else {
    return JSON.parse(r);
  }
}
export function usePrimaryRole() {
  const { isAdmin, isDataScout, isExpertScout, isMember, loading, error } =
    useRole();
  const [prettyRole, setPrettyRole] = useState<string | null>(null);
  useEffect(() => {
    if (!prettyRole && !loading && !error) {
      if (isAdmin) {
        setPrettyRole('admin');
      } else if (isExpertScout) {
        setPrettyRole('expert scout');
      } else if (isDataScout) {
        setPrettyRole('data scout');
      } else if (isMember) {
        setPrettyRole('member');
      } else {
        setPrettyRole('anonymous');
      }
    }
  }, [isAdmin, isDataScout, isExpertScout, isMember, loading, error]);
  return { primaryRole: prettyRole, loading, error };
}

export function useRole() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isExpertScout, setIsExpertScout] = useState(false);
  const [isDataScout, setIsDataScout] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    try {
      const roles = getRoles();
      if (roles) {
        setIsAdmin(roles.includes('ROLE_ADMIN'));
        setIsExpertScout(roles.includes('ROLE_EXPERTSCOUT'));
        setIsDataScout(roles.includes('ROLE_DATASCOUT'));
        setIsMember(roles.includes('ROLE_MEMBER'));
      }
      setLoading(false);
    } catch (e) {
      setError('Failed to load roles: ' + e);
      setLoading(false);
    }
  });
  return { isAdmin, isExpertScout, isDataScout, isMember, loading, error };
}
export function savePassword(password: string) {
  localStorage.setItem('rrPassword', password);
}
export function getPassword() {
  return localStorage.getItem('rrPassword');
}
export function logout() {
  localStorage.removeItem('rrJwt');
  localStorage.removeItem('rrRoles');
  localStorage.removeItem('rrPassword');
  // localStorage.removeItem('rrScoutName'); // keep the name to pre-populate the login form name next time
}

export function addEvent(
  scoutingSessionId: ScoutingSessionId,
  phase: Phase,
  eventType: string,
  note: string = '',
) {
  addEventWithAmount(scoutingSessionId, phase, eventType, 0, note);
}
export function addEventWithAmount(
  scoutingSessionId: ScoutingSessionId,
  phase: Phase,
  eventType: string,
  amount: number,
  note: string = '',
) {
  const scoutingSessionKeyStr = stringifyKey(scoutingSessionId);

  const storageKey = 'rrEvents-' + scoutingSessionKeyStr;
  let stringifiedEventsListing = localStorage.getItem(storageKey);
  let gameEvents: GameEvents;
  const now = new Date();

  if (!stringifiedEventsListing) {
    gameEvents = {
      lastUpdated: now,
      events: [],
    };
  } else {
    gameEvents = parseStringifiedEvents(stringifiedEventsListing);
  }

  const event: GameEvent = {
    timestamp: now,
    scoutName: scoutingSessionId.scoutName,
    tournamentId: scoutingSessionId.tournamentId,
    matchId: scoutingSessionId.matchId,
    alliance: scoutingSessionId.alliance,
    teamNumber: scoutingSessionId.teamNumber,
    eventType: phase + '-' + eventType,
    amount: amount,
    note: note,
    synchronized: false,
  };

  gameEvents.events.push(event);

  stringifiedEventsListing = JSON.stringify(gameEvents);

  localStorage.setItem(storageKey, stringifiedEventsListing);
}

export function readLatestEvent(
  scoutingSessionId: ScoutingSessionId,
  phase: string,
  eventType: string,
) {
  const scoutingSessionKeyStr = stringifyKey(scoutingSessionId);

  const storageKey = 'rrEvents-' + scoutingSessionKeyStr;
  const stringifiedEventsListing = localStorage.getItem(storageKey);
  let gameEvents: GameEvents;
  if (!stringifiedEventsListing) {
    return null;
  } else {
    gameEvents = parseStringifiedEvents(stringifiedEventsListing);
    let event = null;
    const etype = phase + '-' + eventType;
    for (const e of gameEvents.events) {
      if (e.eventType == etype) {
        event = e;
      }
    }
    return event;
  }
}
export function cleanupEmptyScoutingSessions() {
  console.log('Cleaning up empty scouting sessions');
  const tournaments = getScoutedTournaments();
  tournaments.forEach(tournament => {
    const sessions = getScoutedSessionsForTournament(tournament);
    sessions.forEach(session => {
      const events: GameEvent[] = getUnsynchronizedEventsForSession(session);
      if (events.length === 0) {
        // remove event logs that are empty
        const key = 'rrEvents-' + stringifyKey(session);
        console.log('Removing session ', key);
        localStorage.removeItem(key);
        // move session to synchronized:
        // 1. add to synchronized
        const syncStr = localStorage.getItem('rrSynchronizedScoutedSessions');
        let sync: ScoutingSessionId[] = [];
        if (syncStr) {
          sync = JSON.parse(syncStr);
        }
        sync.push(session);
        localStorage.setItem(
          'rrSynchronizedScoutedSessions',
          JSON.stringify(sync),
        );
        // 2. remove from unsynchronized
        const unsyncStr = localStorage.getItem('rrScoutedSessions');
        const newUnsync: ScoutingSessionId[] = JSON.parse(
          unsyncStr ? unsyncStr : '[]',
        );
        const toRemoveKey = stringifyKey(session);
        const idx = newUnsync.findIndex(s => {
          const stringified = stringifyKey(s);
          return stringified == toRemoveKey;
        });
        if (idx > -1) {
          newUnsync.splice(idx, 1);
        }
        localStorage.setItem('rrScoutedSessions', JSON.stringify(newUnsync));
      }
    });
  });
}

export function updateEventSyncStatus(event: GameEvent) {
  const scoutingSessionId: ScoutingSessionId = {
    tournamentId: event.tournamentId,
    scoutName: event.scoutName,
    matchId: event.matchId,
    alliance: event.alliance,
    teamNumber: event.teamNumber,
  };

  const scoutingSessionKeyStr = stringifyKey(scoutingSessionId);

  // first, save to synchronized events.
  const synchronizedStorageKey =
    'rrSynchronizedEvents-' + scoutingSessionKeyStr;
  let stringifiedSyncEventsListing = localStorage.getItem(
    synchronizedStorageKey,
  );
  if (stringifiedSyncEventsListing == null) {
    stringifiedSyncEventsListing = JSON.stringify({
      events: [],
      lastUpdated: new Date() as Date,
    } as GameEvents);
    console.log('Created new sync data store for ', synchronizedStorageKey);
  }
  const synchronizedEvents: GameEvents = parseStringifiedEvents(
    stringifiedSyncEventsListing,
  );
  console.log('Parse stringified sync events listing', synchronizedEvents);
  const toAddToSync = [];
  const toRemoveFromUnsync = [];
  let found = false;
  for (const e of synchronizedEvents.events) {
    if (equalsIgnoreSync(e, event)) {
      found = true;
    }
  }

  if (found) {
    toRemoveFromUnsync.push(event);
  } else {
    toAddToSync.push(event);
    toRemoveFromUnsync.push(event);
  }
  console.log({ toAddToSync, toRemoveFromUnsync });

  if (toAddToSync.length > 0) {
    toAddToSync.forEach(e => {
      synchronizedEvents.events.push(e);
    });
    console.log('SAVING!!');
    localStorage.setItem(
      synchronizedStorageKey,
      JSON.stringify(synchronizedEvents),
    );
    console.log('SAVE TO LOCAL STORE DONE');
  } else {
    console.log('Do not need to add to sync because it is already there');
  }

  // second, remove from unsynchronized events.
  const unsynchronizedStorageKey = 'rrEvents-' + scoutingSessionKeyStr;
  if (toRemoveFromUnsync.length > 0) {
    const s = localStorage.getItem(unsynchronizedStorageKey);
    if (s == null) {
      console.error(
        'Failed to load event listing - but we just did a little while ago!',
        unsynchronizedStorageKey,
      );
      return;
    } else {
      console.log("Found unsync'd events, removing from unsync'd store");
    }
    const unsynchronizedEvents: GameEvents = parseStringifiedEvents(s);
    let changed = false;
    for (const e of toRemoveFromUnsync) {
      for (let i = 0; i < unsynchronizedEvents.events.length; i++) {
        const candidate = unsynchronizedEvents.events[i];
        console.log('Checking...', { candidate, e });
        if (equalsIgnoreSync(candidate, e)) {
          console.log('Trying to remove an event now');
          const nuked = unsynchronizedEvents.events.splice(i, 1);
          changed = true;
          console.log('Seeding and nuked', { candidate, nuked });
          break;
        }
      }
    }
    console.log('Changed?', changed);
    if (changed) {
      localStorage.setItem(
        unsynchronizedStorageKey,
        JSON.stringify(unsynchronizedEvents),
      );
      console.log('REMOVED FROM UNSYNC STORE DONE');
    }
  }
  console.log('EXITING updateEventSyncStatus');
}

export function getAllTournaments(): Tournament[] {
  const str = localStorage.getItem('rrAllTournaments');
  if (!str) {
    return [];
  }

  const list: Tournament[] = JSON.parse(str);
  return list;
}

export function setCurrentTournament(tournamentId: string) {
  const tournament = getTournamentForId(tournamentId);
  const tournamentString = JSON.stringify(tournament);

  localStorage.setItem('rrTournament', tournamentString);
}

export function getCurrentTournament() {
  const tournamentString = localStorage.getItem('rrTournament');
  let tournament: Tournament | null = null;
  if (tournamentString) tournament = JSON.parse(tournamentString);
  return tournament;
}

export function getTournamentForId(tournamentId: string) {
  const tournamentsString = localStorage.getItem('rrAllTournaments');
  if (!tournamentsString) return;
  const tournaments = JSON.parse(tournamentsString);
  let tournament: Tournament | null = null;

  for (let i = 0; i < tournaments.length; i++) {
    if (tournaments[i].id == tournamentId) {
      tournament = tournaments[i];
    }
  }
  return tournament;
}

export function setMatchNumber(match: number) {
  const matchString = JSON.stringify(match);
  localStorage.setItem('rrMatch', matchString);
}

export function setTeam(team: number) {
  const teamString = JSON.stringify(team);
  localStorage.setItem('rrTeam', teamString);
}

export function setScoutingSessionId(alliance: string) {
  const scout = getScoutName();
  const tournamentString = localStorage.getItem('rrTournament');
  const matchString = localStorage.getItem('rrMatch');
  const teamString = localStorage.getItem('rrTeam');

  if (scout && tournamentString && matchString && teamString) {
    const tournament = JSON.parse(tournamentString);
    const match = JSON.parse(matchString);
    const team = JSON.parse(teamString);

    const sessionId: ScoutingSessionId = {
      tournamentId: tournament.id,
      scoutName: scout,
      matchId: match,
      alliance: alliance,
      teamNumber: team,
    };

    const sessionIdString = stringifyKey(sessionId);
    localStorage.setItem('rrScoutingSessionId', sessionIdString);

    let scoutedSessionsString = localStorage.getItem('rrScoutedSessions');

    let scoutedSessions: ScoutingSessionId[] = [];

    if (scoutedSessionsString) {
      scoutedSessions = JSON.parse(scoutedSessionsString);
    }
    scoutedSessions.push(sessionId);
    scoutedSessionsString = JSON.stringify(scoutedSessions);
    localStorage.setItem('rrScoutedSessions', scoutedSessionsString);
  }
}

export function getScoutingSessionId() {
  const sessionIdString = localStorage.getItem('rrScoutingSessionId');
  let sessionId: ScoutingSessionId | null = null;
  if (sessionIdString) sessionId = parseKey(sessionIdString);

  return sessionId;
}

/**
 * Fix bad deserialization
 * @param stringifiedGameEvents
 */
function parseStringifiedEvents(stringifiedGameEvents: string): GameEvents {
  const events = JSON.parse(stringifiedGameEvents) as GameEvents;
  for (const e of events.events) {
    if (e.amount === undefined) {
      e.amount = 0;
    }

    if (e.timestamp instanceof Date) {
      /* empty */
    } else {
      e.timestamp = new Date(e.timestamp);
    }
  }
  return events;
}
export function getScoutedSessions() {
  const scoutedSessionsString = localStorage.getItem('rrScoutedSessions');
  if (!scoutedSessionsString) {
    return [];
  }
  const result = JSON.parse(scoutedSessionsString) as ScoutingSessionId[];
  return result;
}

export function getScoutedTournaments() {
  const scoutedSessionsString = localStorage.getItem('rrScoutedSessions');
  const tourns: Tournament[] = [];
  if (!scoutedSessionsString) {
    console.warn('No scouted sessions found');
  } else {
    const sessions = JSON.parse(scoutedSessionsString) as ScoutingSessionId[];
    const tournIds = new Set(sessions.map(s => s.tournamentId));
    tournIds.forEach(id => {
      const t = getTournamentForId(id);
      if (t) {
        tourns.push(t);
      } else {
        console.warn('No tournament found for id ', id);
      }
    });
  }
  return tourns;
}

export function getScoutedSessionsForTournament(tournament: Tournament) {
  const sessions: ScoutingSessionId[] = [];
  const scoutedSessionsString = localStorage.getItem('rrScoutedSessions');
  if (!scoutedSessionsString) {
    console.warn('No scouted sessions found');
  } else {
    const allScoutedSessions = JSON.parse(
      scoutedSessionsString,
    ) as ScoutingSessionId[];
    allScoutedSessions.forEach(s => {
      if (s.tournamentId === tournament.id) {
        sessions.push(s);
      }
    });
  }
  return sessions;
}

export function getUnsynchronizedEventsForSession(session: ScoutingSessionId) {
  const events: GameEvent[] = [];
  const sessionString = stringifyKey(session);
  const key = 'rrEvents-' + sessionString;
  const stringifiedLog = localStorage.getItem(key);
  if (!stringifiedLog) {
    if (session.teamNumber !== -1310) {
      console.warn(
        'Could not find scouting data for ' +
          session.tournamentId +
          ' match ' +
          session.matchId +
          ' team ' +
          session.teamNumber,
      );
    }
  } else {
    const allEvents = parseStringifiedEvents(stringifiedLog);
    allEvents.events.forEach(e => {
      events.push({ ...e, timestamp: new Date(e.timestamp) });
    });
  }
  return events;
}

export function getCurrentGamestate() {
  const gamestateString = localStorage.getItem('rrCurrentGamestate');
  let gamestate = null;
  if (gamestateString) {
    gamestate = JSON.parse(gamestateString);
  }
  return gamestate;
}

export function addQuickComment(quickComment: QuickComment) {
  const quickCommentsString = localStorage.getItem('rrQuickComments');
  let quickComments: QuickComment[] | null = null;

  if (quickCommentsString) {
    quickComments = JSON.parse(quickCommentsString) as QuickComment[];
  } else {
    quickComments = [];
  }

  quickComments.push(quickComment);

  const stringifiedQuickComments = JSON.stringify(quickComments);
  localStorage.setItem('rrQuickComments', stringifiedQuickComments);
}
