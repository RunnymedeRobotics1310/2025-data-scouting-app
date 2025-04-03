import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';
import { addDefenceEndedEvent, addEvent } from '../storage/local.ts';
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
  addDefenceEndedEvent(scoutingSessionId, Phase.teleop, time + 's');
  return;
}
