import { Mode } from '../common/mode.ts';
import { match_select } from '../modes/match_select.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/util.ts';

export function saveFeedback(
  scoutingSessionId: ScoutingSessionId,
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

  addEvent(scoutingSessionId, 'comment', comment);

  if (autoRP) {
    addEvent(scoutingSessionId, 'auto-rp');
  }
  if (coralRP) {
    addEvent(scoutingSessionId, 'coral-rp');
  }
  if (bargeRP) {
    addEvent(scoutingSessionId, 'barge-rp');
  }
  addEvent(scoutingSessionId, 'star-rating-' + stars);

  return match_select;
}
