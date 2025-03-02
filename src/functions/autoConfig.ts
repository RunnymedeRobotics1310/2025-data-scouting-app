import { Mode } from '../common/mode.ts';
import { start_line } from '../modes/start_line.ts';

export enum RobotPosition {
  left = 'left',
  center = 'center',
  right = 'right',
}

export function autoConfig(preloaded: boolean, position: RobotPosition): Mode {
  console.log(
    'Configuring auto. Position = ' + position + ' Preloaded = ' + preloaded,
  );
  localStorage;

  return start_line;
}
