import Modes from '../common/modes.ts';
import { start_line } from '../modes/start_line.ts';
import { match_select } from '../modes/match_select.ts';
import { checklist } from '../modes/checklist.ts';
import { endgame } from '../modes/endgame.ts';

export enum Phase {
  pre_match = 'PRE-MATCH',
  auto = 'AUTO',
  teleop = 'TELEOP',
  endgame = 'ENDGAME',
  comments = 'COMMENTS',
}

export function setPhase(currentMode: Modes, desiredPhase: Phase): Modes {
  console.log('Proceeding to ' + desiredPhase);
  // todo: phase = desired Phase

  if (desiredPhase === Phase.pre_match) {
    return match_select;
  }
  if (desiredPhase === Phase.auto) {
    return start_line;
  }
  if (desiredPhase === Phase.teleop) {
    return currentMode;
  }
  if (desiredPhase === Phase.endgame) {
    return endgame;
  }
  if (desiredPhase === Phase.comments) {
    return checklist;
  }

  console.error('No More Phases');
  return match_select;
}
