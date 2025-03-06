import { Phase } from '../common/phase.ts';

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
  modeBeforePenalty: string;
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
  modeBeforePenalty: '/game/holding-nothing', // todo: consider moving to constants
} as GS;
