import { Mode } from '../common/mode.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_both } from '../modes/holding_both.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/local.ts';
import { Phase } from '../common/phase.ts';

export function dropAlgae(
  scoutingSessionId: ScoutingSessionId,
  phase: Phase,
  mode: Mode,
): Mode {
  console.log('Dropped algae from ' + mode.label);

  addEvent(scoutingSessionId, phase, 'drop-algae');

  if (mode === holding_algae) {
    return holding_nothing;
  }

  if (mode === holding_both) {
    return holding_coral;
  }

  console.error('Cannot drop algae without holding algae');
  return holding_nothing;
}
