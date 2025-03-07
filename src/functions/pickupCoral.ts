import { Mode } from '../common/mode.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { holding_both } from '../modes/holding_both.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/util.ts';
import { Phase } from '../common/phase.ts';

export enum CoralLocation {
  ground = 'floor',
  left = 'station-left',
  right = 'station-right',
  autoLeft = 'auto-left',
  autoCenter = 'auto-center',
  autoRight = 'auto-right',
}

export function pickupCoral(
  scoutingSessionId: ScoutingSessionId,
  phase: Phase,
  startingMode: Mode,
  location: CoralLocation,
): Mode {
  console.log(
    'Picking up coral from ' + location + ' from ' + startingMode.label,
  );

  addEvent(scoutingSessionId, phase, 'pickup-coral-' + location);

  if (startingMode == holding_nothing) {
    return holding_coral;
  }
  if (startingMode == holding_algae) {
    return holding_both;
  }

  console.error('Cannot pickup coral from ' + startingMode.label);
  return holding_nothing;
}
