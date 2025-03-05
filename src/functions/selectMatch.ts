import { Mode } from '../common/mode.ts';
import { match_config } from '../modes/match_config.ts';
import { addEvent, getScoutingSessionId } from '../storage/util.ts';
import { scout_select } from '../modes/scout_select.ts';

export function selectMatch(rematch: boolean): Mode {
  const scoutingSessionId = getScoutingSessionId();
  if (scoutingSessionId) {
    console.log(scoutingSessionId + '. Rematch: ' + rematch);

    if (rematch) {
      addEvent(scoutingSessionId, 'rematch');
    }

    return match_config;
  } else return scout_select;
}
