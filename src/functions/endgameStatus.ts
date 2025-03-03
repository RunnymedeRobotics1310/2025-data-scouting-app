import { Mode } from '../common/mode.ts';
import { checklist } from '../modes/checklist.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/util.ts';

export enum EndgameStatus {
  none = 'none',
  park = 'park',
  shallow = 'shallow',
  deep = 'deep',
}
export function endgameStatus(
  scoutingSessionId: ScoutingSessionId,
  status: EndgameStatus,
): Mode {
  console.log('Robot finished game by ' + status);

  addEvent(scoutingSessionId, 'climb-' + status);

  return checklist;
}
