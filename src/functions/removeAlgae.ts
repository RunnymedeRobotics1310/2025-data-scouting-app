import { Mode } from '../common/mode.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { AlgaeLocation, pickupAlgae } from './pickupAlgae.ts';
import { addEvent } from '../storage/util.ts';

export function removeAlgae(
  scoutingSessionId: ScoutingSessionId,
  startingMode: Mode,
  plucked: boolean,
) {
  console.log(
    'Removed algae from reef from: ' +
      startingMode.label +
      ' Plucked: ' +
      plucked,
  );

  addEvent(scoutingSessionId, 'remove-algae');

  let nextMode = startingMode;

  if (startingMode === holding_nothing) {
    console.log('holding nothing');
  }
  if (startingMode === holding_coral) {
    console.log('holding coral');
  }

  if (plucked) {
    nextMode = pickupAlgae(scoutingSessionId, startingMode, AlgaeLocation.reef);
  }

  return nextMode;
}
