import { GS } from '../context/GS.ts';
import { Mode } from '../common/mode.ts';
import { match_config } from '../modes/match_config.ts';
import { Phase } from '../common/phase.ts';
import { start_line } from '../modes/start_line.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { holding_both } from '../modes/holding_both.ts';
import { endgame } from '../modes/endgame.ts';
import { checklist } from '../modes/checklist.ts';
import { human_feedback } from '../modes/human_feedback.ts';

export function getResumedMode(state: GS): Mode {
  if (state.currentPhase == Phase.pre_match) {
    return match_config;
  }

  if (state.currentPhase == Phase.auto && !state.left) {
    return start_line;
  }

  if (state.currentPhase == Phase.endgame) {
    return endgame;
  }

  if (state.currentPhase == Phase.comments) {
    return checklist;
  }

  if (!state.holdingCoral && !state.holdingAlgae) {
    return holding_nothing;
  }
  if (state.holdingCoral && !state.holdingAlgae) {
    return holding_coral;
  }
  if (!state.holdingCoral && state.holdingAlgae) {
    return holding_algae;
  }
  if (state.holdingCoral && state.holdingAlgae) {
    return holding_both;
  }

  return human_feedback;
}
