import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addEvent } from '../storage/util.ts';
import { Phase } from '../common/phase.ts';

export function startDefence(scoutingSessionId: ScoutingSessionId) {
  console.log('Defence started');
  addEvent(scoutingSessionId, Phase.teleop, 'defence-started');
  return;
}

export function stopDefence(
  scoutingSessionId: ScoutingSessionId,
  time: number,
) {
  console.log('Defence stopped');
  addEvent(scoutingSessionId, Phase.teleop, 'defence-stopped', time + 's');
  return;
}
