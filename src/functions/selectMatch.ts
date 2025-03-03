import { Mode } from '../common/mode.ts';
import { match_config } from '../modes/match_config.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/util.ts';

export function selectMatch(
  scoutingSessionId: ScoutingSessionId,
  rematch: boolean,
): Mode {
  console.log(scoutingSessionId + '. Rematch: ' + rematch);

  if (rematch) {
    addEvent(scoutingSessionId, 'rematch');
  }

  return match_config;
}
