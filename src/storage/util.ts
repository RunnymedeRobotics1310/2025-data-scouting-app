import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';

export function parseKey(keyString: string): ScoutingSessionId {
  const arr = keyString.split('|');
  const key: ScoutingSessionId = {
    tournament: arr[0],
    scout: arr[1],
    match: arr[2],
    team: arr[3],
  };
  return key;
}

export function stringifyKey(obj: ScoutingSessionId): string {
  return obj.tournament + '|' + obj.scout + '|' + obj.match + '|' + obj.team;
}
