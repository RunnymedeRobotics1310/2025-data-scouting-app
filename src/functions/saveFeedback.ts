import { Mode } from '../common/mode.ts';
import { match_select } from '../modes/match_select.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/util.ts';
import { Phase } from '../common/phase.ts';

export function saveFeedback(
  scoutingSessionId: ScoutingSessionId,
  phase: Phase,
  comment: string,
  autoRP: boolean,
  coralRP: boolean,
  bargeRP: boolean,
  stars: number,
): Mode {
  console.log(
    'Comment: ' +
      comment +
      '\nAuto RP: ' +
      autoRP +
      ' Coral RP: ' +
      coralRP +
      ' Barge RP: ' +
      bargeRP +
      ' Stars: ' +
      stars,
  );

  addEvent(scoutingSessionId, phase, 'comment', comment);

  if (autoRP) {
    addEvent(scoutingSessionId, phase, 'auto-rp');
  }
  if (coralRP) {
    addEvent(scoutingSessionId, phase, 'coral-rp');
  }
  if (bargeRP) {
    addEvent(scoutingSessionId, phase, 'barge-rp');
  }
  addEvent(scoutingSessionId, phase, 'star-rating-' + stars);

  return match_select;
}
