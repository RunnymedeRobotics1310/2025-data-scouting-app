import Modes from '../common/modes.ts';
import { match_config } from '../modes/match_config.ts';

export function selectMatch(
  scout: string,
  match: number,
  team: number,
  rematch: boolean,
): Modes {
  console.log(
    'Scout ' +
      scout +
      'is scouting team ' +
      team +
      'in match ' +
      match +
      '. Rematch: ' +
      rematch,
  );

  return match_config;
}
