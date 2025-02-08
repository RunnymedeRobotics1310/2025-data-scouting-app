import { Mode } from '../common/mode.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { holding_both } from '../modes/holding_both.ts';

export enum CoralLocation {
  ground = 'Ground',
  left = 'Left Station',
  right = 'Right Station',
  auto = 'Auto',
}

export function pickupCoral(startingMode: Mode, location: CoralLocation): Mode {
  console.log(
    'Picking up coral from ' + location + ' from ' + startingMode.label,
  );

  if (startingMode == holding_nothing) {
    return holding_coral;
  }
  if (startingMode == holding_algae) {
    return holding_both;
  }

  console.error('Cannot pickup coral from ' + startingMode.label);
  return holding_nothing;
}
