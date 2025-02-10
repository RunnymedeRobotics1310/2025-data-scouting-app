import { Mode } from '../common/mode.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';

export function leaveStartingLine(preloaded: boolean, inAuto: boolean): Mode {
  if (inAuto) console.log('Left starting zone. Preset: ' + preloaded);
  else console.log("Didn't leave in auto. Preset: " + preloaded);
  if (preloaded) {
    return holding_coral;
  }
  return holding_nothing;
}
