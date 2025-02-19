import { Mode } from '../common/mode.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';

export function leaveStartingLine(preloaded: boolean): Mode {
  if (preloaded) {
    return holding_coral;
  }
  return holding_nothing;
}
