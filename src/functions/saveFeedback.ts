import { Mode } from '../common/mode.ts';
import { match_select } from '../modes/match_select.ts';

export function saveFeedback(
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
  return match_select;
}
