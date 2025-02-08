import { Mode } from '../common/mode.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_both } from '../modes/holding_both.ts';
import { holding_coral } from '../modes/holding_coral.ts';

export function scoreAlgaeProcessor(startingMode: Mode): Mode {
  console.log('Score algae in processor from ' + startingMode.label);

  if (startingMode === holding_algae) {
    return holding_nothing;
  }

  if (startingMode === holding_both) {
    return holding_coral;
  }

  console.error('Cannot score algae without algae');
  return holding_nothing;
}
