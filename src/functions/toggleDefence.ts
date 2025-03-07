import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/util.ts';
import { Phase } from '../common/phase.ts';

let defence = false;
//TODO: add time
export function toggleDefence(scoutingSessionId: ScoutingSessionId) {
  defence = !defence;
  if (defence) {
    console.log('Defence started');
    addEvent(scoutingSessionId, Phase.teleop, 'defence-started');
  } else {
    console.log('Defence stopped');
    addEvent(scoutingSessionId, Phase.teleop, 'defence-stopped');
  }
  return;
}
