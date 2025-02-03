import Modes from '../common/modes.ts';
import { match_select } from '../modes/match_select.ts';

export function saveFeedback(
  comment: string,
  autoRP: boolean,
  coralRP: boolean,
  bargeRP: boolean,
  stars: number,
): Modes {
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
  return match_select;
}
