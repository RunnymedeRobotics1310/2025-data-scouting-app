import Modes from '../common/modes.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { holding_both } from '../modes/holding_both.ts';

export enum CoralLocation {
  ground = 'Ground',
  left = 'Left Station',
  right = 'Right Station',
  auto1 = 'Auto 1',
  auto2 = 'Auto 2',
  auto3 = 'Auto 3',
}

export function pickupCoral(
  startingMode: Modes,
  location: CoralLocation,
): Modes {
  console.log(
    'Picking up coral from ' + location + ' from ' + startingMode.label,
  );

  if (startingMode === holding_nothing) {
    return holding_coral;
  }
  if (startingMode === holding_algae) {
    return holding_both;
  }

  console.error('Cannot pickup coral from ' + startingMode.label);
  return holding_nothing;
}
