import { Mode } from '../common/mode.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_both } from '../modes/holding_both.ts';
import { holding_algae } from '../modes/holding_algae.ts';

export function dropCoral(mode: Mode): Mode {
  console.log('Dropped coral from ' + mode.label);

  if (mode === holding_coral) {
    return holding_nothing;
  }

  if (mode === holding_both) {
    return holding_algae;
  }

  console.error("How do you drop coral if you don't have any?");
  return holding_nothing;
}
