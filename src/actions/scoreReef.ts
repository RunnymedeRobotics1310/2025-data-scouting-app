import Modes from '../common/modes.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_both } from '../modes/holding_both.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { holding_coral } from '../modes/holding_coral.ts';

/**
 * Score on the reef
 * @param startingMode the insitial mode of the game
 * @param level the level on which to score
 * @returns the next mode
 */
export function scoreReef(startingMode: Modes, level: number): Modes {
  console.log('Scored reef level ' + level + ' from ' + startingMode.label);
  // do fancy logic like storing info etc.
  // return the next mode

  if (startingMode === holding_both) {
    return holding_algae;
  }

  if (startingMode === holding_coral) {
    return holding_nothing;
  }

  console.error('Cannot score reef from holding nothing');
  return holding_nothing;
}
