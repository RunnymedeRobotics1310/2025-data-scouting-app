import { Phase } from '../common/phase.ts';

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
} as GS;
