import Modes from '../common/modes.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_both } from '../modes/holding_both.ts';

export function removeAlgae(startingMode: Modes, plucked: boolean): Modes {
  console.log(
    'Removed algae from reef from : ' +
      startingMode.label +
      ' Plucked: ' +
      plucked,
  );

  if (plucked && startingMode === holding_nothing) {
    return holding_algae;
  }

  if (plucked && startingMode === holding_coral) {
    return holding_both;
  }

  if (plucked) {
    console.error('Cannot pluck algae while holding algae');
  }
  return startingMode;
}
