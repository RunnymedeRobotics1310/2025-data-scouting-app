import { human_feedback } from '../modes/human_feedback.ts';
import { Mode } from '../common/mode.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/util.ts';
import { Phase } from '../common/phase.ts';

export function saveChecklist(
  scoutingSessionId: ScoutingSessionId,
  phase: Phase,
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
    addEvent(scoutingSessionId, phase, 'feedback-fell-over');
  }
  if (recover) {
    addEvent(scoutingSessionId, phase, 'feedback-recover');
  }
  if (shutDown) {
    addEvent(scoutingSessionId, phase, 'feedback-shut-down');
  }
  if (defence) {
    addEvent(scoutingSessionId, phase, 'feedback-play-defence');
  }
  if (effectively) {
    addEvent(scoutingSessionId, phase, 'feedback-effective-defence');
  }
  if (collector) {
    addEvent(scoutingSessionId, phase, 'feedback-play-collector');
  }
  if (foul) {
    addEvent(scoutingSessionId, phase, 'feedback-foul-often');
  }
  if (score) {
    addEvent(scoutingSessionId, phase, 'feedback-score-consistently');
  }
  if (fast) {
    addEvent(scoutingSessionId, phase, 'feedback-drove-fast');
  }

  return human_feedback;
}
