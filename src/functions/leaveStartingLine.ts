import { Mode } from '../common/mode.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';

export function leaveStartingLine(preloaded: boolean): Mode {
  // TODO: this should be global
  console.log('Left starting zone. Preset: ' + preloaded);
  if (preloaded) {
    return holding_coral;
  }
  return holding_nothing;
}
