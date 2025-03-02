import { Mode } from '../common/mode.ts';

export enum Penalty {
  opponentContact = 'Opponent Contact',
  throwingAlgae = 'Throwing O',

  pin = 'Pin',
  zoneViolation = 'Zone Violation',

  offLimitContact = 'Off-limit contact',
  fieldDamage = 'Field damage',
  tooManyGamePieces = 'Too many []/O',
  other = 'Other',
}
export function logPenalty(penalty: Penalty, prevMode: Mode): Mode {
  console.log('Robot committed penalty: ' + penalty);
  return prevMode;
}
