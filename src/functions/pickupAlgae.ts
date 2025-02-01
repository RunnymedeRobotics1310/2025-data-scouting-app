import Modes from '../common/modes.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_both } from '../modes/holding_both.ts';

export enum AlgaeLocation {
  ground = 'Ground',
  auto1 = 'Auto 1',
  auto2 = 'Auto 2',
  auto3 = 'Auto 3',
}

export function pickupAlgae(
  startingMode: Modes,
  location: AlgaeLocation,
): Modes {
  console.log(
    'Picked up algae from ' + location + 'from ' + startingMode.label,
  );
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
