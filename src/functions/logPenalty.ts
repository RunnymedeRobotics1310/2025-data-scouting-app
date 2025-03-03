import { Mode } from '../common/mode.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/util.ts';

export enum Penalty {
  opponentContact = 'opponent-contact',
  throwingAlgae = 'throwing-algae',

  pin = 'pin',
  zoneViolation = 'zone-violation',

  offLimitContact = 'off-limit-contact',
  fieldDamage = 'field-damage',
  tooManyGamePieces = 'too-many-game-pieces',
  other = 'other',
}
export function logPenalty(
  scoutingSessionId: ScoutingSessionId,
  penalty: Penalty,
  prevMode: Mode,
): Mode {
  console.log('Robot committed penalty: ' + penalty);

  addEvent(scoutingSessionId, 'penalty-' + penalty);

  return prevMode;
}
