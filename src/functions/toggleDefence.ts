import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/util.ts';

let defence = false;
//TODO: add time
export function toggleDefence(scoutingSessionId: ScoutingSessionId) {
  defence = !defence;
  if (defence) {
    console.log('Defence started');
    addEvent(scoutingSessionId, 'defence-started');
  } else {
    console.log('Defence stopped');
    addEvent(scoutingSessionId, 'defence-stopped');
  }
  return;
}
