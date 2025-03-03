import { Mode } from '../common/mode.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_both } from '../modes/holding_both.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/util.ts';

export enum AlgaeLocation {
  ground = 'floor',
  autoLeft = 'auto-left',
  autoCenter = 'auto-center',
  autoRight = 'auto-right',
  reef = 'reef',
}

export function pickupAlgae(
  scoutingSessionId: ScoutingSessionId,
  startingMode: Mode,
  location: AlgaeLocation,
): Mode {
  console.log(
    'Picked up algae from ' + location + ' from ' + startingMode.label,
  );

  addEvent(scoutingSessionId, 'pickup-algae-' + location);

  if (startingMode == holding_nothing) {
    console.log('proceeding to holding algae');
    return holding_algae;
  }

  if (startingMode == holding_coral) {
    console.log('proceeding to holding both');
    return holding_both;
  }

  console.error('Cannot pickup algae from ' + startingMode.label);
  return holding_nothing;
}
