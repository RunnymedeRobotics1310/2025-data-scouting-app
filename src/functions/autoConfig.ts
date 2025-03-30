import { Mode } from '../common/mode.ts';
import { start_line } from '../modes/start_line.ts';
import { addEvent } from '../storage/local.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { Phase } from '../common/phase.ts';

export enum RobotPosition {
  left = 'left',
  center = 'center',
  right = 'right',
}

export function autoConfig(
  scoutingSessionId: ScoutingSessionId,
  phase: Phase,
  preloaded: boolean,
  position: RobotPosition,
): Mode {
  console.log(
    'Configuring auto. Position = ' + position + ' Preloaded = ' + preloaded,
  );

  addEvent(scoutingSessionId, phase, 'auto-start-' + position);

  if (preloaded) {
    addEvent(scoutingSessionId, phase, 'preloaded-coral');
  } else {
    addEvent(scoutingSessionId, phase, 'preloaded-nothing');
  }

  return start_line;
}
