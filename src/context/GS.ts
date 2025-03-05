import { Phase } from '../common/phase.ts';
import { Mode } from '../common/mode.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';

export type GS = {
  preloaded: boolean;
  currentPhase: Phase;
  left: boolean;
  holdingCoral: boolean;
  holdingAlgae: boolean;
  pickedAutoCoralLeft: boolean;
  pickedAutoCoralCenter: boolean;
  pickedAutoCoralRight: boolean;
  pickedAutoAlgaeLeft: boolean;
  pickedAutoAlgaeCenter: boolean;
  pickedAutoAlgaeRight: boolean;
  modeBeforePenalty: Mode;
};

export const DEFAULT_GAME_STATE = {
  preloaded: false,
  currentPhase: Phase.pre_match,
  left: false,
  holdingCoral: false,
  holdingAlgae: false,
  pickedAutoCoralLeft: false,
  pickedAutoCoralCenter: false,
  pickedAutoCoralRight: false,
  pickedAutoAlgaeLeft: false,
  pickedAutoAlgaeCenter: false,
  pickedAutoAlgaeRight: false,
  modeBeforePenalty: holding_nothing,
} as GS;
