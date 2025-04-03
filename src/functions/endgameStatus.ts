import { Mode } from '../common/mode.ts';
import { checklist } from '../modes/checklist.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/local.ts';
import { Phase } from '../common/phase.ts';

export enum EndgameStatus {
  none = 'none',
  park = 'park',
  shallow = 'shallow',
  deep = 'deep',
}
export function endgameStatus(
  scoutingSessionId: ScoutingSessionId,
  phase: Phase,
  status: EndgameStatus,
): Mode {
  console.log('Robot finished game by ' + status);

  addEvent(scoutingSessionId, phase, 'climb-' + status);

  return checklist;
}
