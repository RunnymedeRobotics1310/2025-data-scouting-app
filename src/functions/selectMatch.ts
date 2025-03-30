import { Mode } from '../common/mode.ts';
import { match_config } from '../modes/match_config.ts';
import { addEvent, getScoutingSessionId } from '../storage/local.ts';
import { Phase } from '../common/phase.ts';
import { home } from '../modes/home.ts';

export function selectMatch(rematch: boolean): Mode {
  const scoutingSessionId = getScoutingSessionId();
  if (scoutingSessionId) {
    console.log(scoutingSessionId + '. Rematch: ' + rematch);

    if (rematch) {
      addEvent(scoutingSessionId, Phase.pre_match, 'rematch');
    }

    return match_config;
  } else return home;
}
