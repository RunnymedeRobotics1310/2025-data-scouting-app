import { Phase, setPhase } from './setPhase.ts';
import { match_config } from '../modes/match_config.ts';
import Modes from '../common/modes.ts';

export enum RobotPosition {
  left = 'left',
  center = 'center',
  right = 'right',
}

export function autoConfig(preloaded: boolean, position: RobotPosition): Modes {
  console.log(
    'Configuring auto. Position = ' + position + ' Preloaded = ' + preloaded,
  );

  //TODO: set global preloaded to preloaded
  //TODO: set global position to position

  return setPhase(match_config, Phase.auto);
}
