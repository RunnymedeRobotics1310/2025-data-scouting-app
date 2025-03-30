import { Mode } from '../common/mode.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { AlgaeLocation, pickupAlgae } from './pickupAlgae.ts';
import { addEvent } from '../storage/local.ts';
import { Phase } from '../common/phase.ts';

export function removeAlgae(
  scoutingSessionId: ScoutingSessionId,
  phase: Phase,
  startingMode: Mode,
  plucked: boolean,
) {
  console.log(
    'Removed algae from reef from: ' +
      startingMode.label +
      ' Plucked: ' +
      plucked,
  );

  addEvent(scoutingSessionId, phase, 'remove-algae');

  let nextMode = startingMode;

  if (startingMode === holding_nothing) {
    console.log('holding nothing');
  }
  if (startingMode === holding_coral) {
    console.log('holding coral');
  }

  if (plucked) {
    nextMode = pickupAlgae(
      scoutingSessionId,
      phase,
      startingMode,
      AlgaeLocation.reef,
    );
  }

  return nextMode;
}
