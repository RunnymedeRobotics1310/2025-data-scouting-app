import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { GameEvent } from '../types/GameEvent.ts';
import { GameEvents } from '../types/GameEvents.ts';
import { Tournament } from '../types/Tournament.ts';

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
  console.log('Stringifying: ', obj);

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

export function addEvent(
  scoutingSessionId: ScoutingSessionId,
  eventType: string,
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
    gameEvents = JSON.parse(stringifiedEventsListing);
  }

  const event: GameEvent = {
    timestamp: now,
    scoutName: scoutingSessionId.scoutName,
    tournamentId: scoutingSessionId.tournamentId,
    matchId: scoutingSessionId.matchId,
    alliance: scoutingSessionId.alliance,
    teamNumber: scoutingSessionId.teamNumber,
    eventType: eventType,
    note: note,
    synchronized: false,
  };

  gameEvents.events.push(event);

  stringifiedEventsListing = JSON.stringify(gameEvents);

  localStorage.setItem(storageKey, stringifiedEventsListing);
}

export function getAllTournaments() {
  const eventListString = localStorage.getItem('rrAllTournaments');
  if (!eventListString) {
    return null;
  }

  const eventList: Tournament[] = JSON.parse(eventListString);

  return eventList;
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

export function setScout(name: string) {
  localStorage.setItem('rrScout', name);
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
  const scout = localStorage.getItem('rrScout');
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
