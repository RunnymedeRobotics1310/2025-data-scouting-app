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
  return (
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
    return [''];
  }

  const eventList: Tournament[] = JSON.parse(eventListString);

  return eventList;
}

export function getCurrentTournament() {
  return;
}
