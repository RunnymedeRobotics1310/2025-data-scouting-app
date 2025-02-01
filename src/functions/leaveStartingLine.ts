import Modes from '../common/modes.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';

export function leaveStartingLine(): Modes {
  // TODO: this should be global
  let preset = false;
  console.log('Left starting zone. Preset: ' + preset);
  if (preset) {
    return holding_coral;
  }
  return holding_nothing;
}
