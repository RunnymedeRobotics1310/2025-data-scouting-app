import Modes from '../common/modes.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_both } from '../modes/holding_both.ts';

export function pickupAlgae(startingMode: Modes): Modes {
  console.log('Picked up algae from ' + startingMode.label);
  // do fancy logic like storing info etc.
  // return the next mode

  if (startingMode === holding_nothing) {
    return holding_algae;
  }

  if (startingMode === holding_coral) {
    return holding_both;
  }

  console.error('Cannot pickup algae from ' + startingMode.label);
  return holding_nothing;
}
