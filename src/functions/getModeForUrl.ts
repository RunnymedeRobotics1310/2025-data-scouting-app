import { Mode } from '../common/mode.ts';
import { start_line } from '../modes/start_line.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { holding_both } from '../modes/holding_both.ts';
import { endgame } from '../modes/endgame.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { human_feedback } from '../modes/human_feedback.ts';

export function getModeForUrl(url: string): Mode {
  const modeList: Mode[] = [
    holding_nothing,
    holding_coral,
    holding_algae,
    holding_both,
    start_line,
    endgame,
  ];

  for (let i = 0; i < modeList.length; i++) {
    if ('/2025-data-scouting-app' + modeList[i].url == url) {
      return modeList[i];
    }
  }
  return human_feedback;
}
