import { human_feedback } from '../modes/human_feedback.ts';
import Modes from '../common/modes.ts';

export function saveChecklist(
  fall: boolean,
  recover: boolean,
  shutDown: boolean,
  defence: boolean,
  effectively: boolean,
  collector: boolean,
  foul: boolean,
  score: boolean,
  fast: boolean,
): Modes {
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

  return human_feedback;
}
