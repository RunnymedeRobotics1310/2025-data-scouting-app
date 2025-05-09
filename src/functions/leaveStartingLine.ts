import { Mode } from '../common/mode.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/local.ts';
import { Phase } from '../common/phase.ts';

export function leaveStartingLine(
  scoutingSessionId: ScoutingSessionId,
  phase: Phase,
  preloaded: boolean,
): Mode {
  addEvent(scoutingSessionId, phase, 'leave-starting-line');

  if (preloaded) {
    return holding_coral;
  }
  return holding_nothing;
}
