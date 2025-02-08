import { Mode } from '../common/mode.ts';
import { checklist } from '../modes/checklist.ts';

export enum EndgameStatus {
  none = 'Not parking',
  park = 'Parking',
  shallow = 'Shallow climbing',
  deep = 'Deep climbing',
}
export function endgameStatus(status: EndgameStatus): Mode {
  console.log('Robot finished game by ' + status);
  return checklist;
}
