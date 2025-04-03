import { Mode } from '../common/mode.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_both } from '../modes/holding_both.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/local.ts';
import { Phase } from '../common/phase.ts';

/**
 * Score on the reef
 * @param startingMode the insitial mode of the game
 * @param level the level on which to score
 * @returns the next mode
 */
export function scoreReef(
  scoutingSessionId: ScoutingSessionId,
  phase: Phase,
  startingMode: Mode,
  level: number,
): Mode {
  console.log('Scored reef level ' + level + ' from ' + startingMode.label);
  // do fancy logic like storing info etc.
  // return the next mode

  addEvent(scoutingSessionId, phase, 'score-reef-l' + level);

  if (startingMode === holding_both) {
    return holding_algae;
  }

  if (startingMode === holding_coral) {
    return holding_nothing;
  }

  console.error('Cannot score reef from holding nothing');
  return holding_nothing;
}
