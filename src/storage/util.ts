import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';

export function parseKey(keyString: string): ScoutingSessionId {
  const arr = keyString.split('|');
  const key: ScoutingSessionId = {
    tournamentId: arr[0],
    scoutName: arr[1],
    matchNumber: parseInt(arr[2]),
    teamNumber: parseInt(arr[3]),
  };
  return key;
}

export function stringifyKey(obj: ScoutingSessionId): string {
  return (
    obj.tournamentId +
    '|' +
    obj.scoutName +
    '|' +
    obj.matchNumber +
    '|' +
    obj.teamNumber
  );
}
