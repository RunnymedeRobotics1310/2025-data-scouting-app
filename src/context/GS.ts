import { Phase } from '../common/phase.ts';
import { Mode } from '../common/mode.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';

export type GS = {
  tournamentId: string;
  scoutName: string;
  matchNumber: number;
  teamNumber: number;

  preloaded: boolean;
  currentPhase: Phase;
  isRed: boolean;
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
  tournamentId: 'elkhartLake',
  scoutName: 'Quentin the Not-so-Great',
  matchNumber: -1,
  teamNumber: -1310,

  preloaded: false,
  currentPhase: Phase.pre_match,
  isRed: true,
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
