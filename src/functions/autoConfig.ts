import { Mode } from '../common/mode.ts';
import { start_line } from '../modes/start_line.ts';
import { addEvent } from '../storage/util.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';

export enum RobotPosition {
  left = 'left',
  center = 'center',
  right = 'right',
}

export function autoConfig(
  scoutingSessionId: ScoutingSessionId,
  preloaded: boolean,
  position: RobotPosition,
): Mode {
  console.log(
    'Configuring auto. Position = ' + position + ' Preloaded = ' + preloaded,
  );

  addEvent(scoutingSessionId, 'auto-start-' + position);

  if (preloaded) {
    addEvent(scoutingSessionId, 'preloaded-coral');
  } else {
    addEvent(scoutingSessionId, 'preloaded-nothing');
  }

  return start_line;
}
