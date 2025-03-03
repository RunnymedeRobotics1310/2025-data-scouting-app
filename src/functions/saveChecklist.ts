import { human_feedback } from '../modes/human_feedback.ts';
import { Mode } from '../common/mode.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/util.ts';

export function saveChecklist(
  scoutingSessionId: ScoutingSessionId,
  fall: boolean,
  recover: boolean,
  shutDown: boolean,
  defence: boolean,
  effectively: boolean,
  collector: boolean,
  foul: boolean,
  score: boolean,
  fast: boolean,
): Mode {
  console.log(
    'Checklist saved: ' +
      fall +
      recover +
      shutDown +
      defence +
      effectively +
      collector +
      foul +
      score +
      fast,
  );

  if (fall) {
    addEvent(scoutingSessionId, 'feedback-fell-over');
  }
  if (recover) {
    addEvent(scoutingSessionId, 'feedback-recover');
  }
  if (shutDown) {
    addEvent(scoutingSessionId, 'feedback-shut-down');
  }
  if (defence) {
    addEvent(scoutingSessionId, 'feedback-play-defence');
  }
  if (effectively) {
    addEvent(scoutingSessionId, 'feedback-effective-defence');
  }
  if (collector) {
    addEvent(scoutingSessionId, 'feedback-play-collector');
  }
  if (foul) {
    addEvent(scoutingSessionId, 'feedback-foul-often');
  }
  if (score) {
    addEvent(scoutingSessionId, 'feedback-score-consistently');
  }
  if (fast) {
    addEvent(scoutingSessionId, 'feedback-drove-fast');
  }

  return human_feedback;
}
