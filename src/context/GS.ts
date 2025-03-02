import { Phase } from '../common/phase.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';

export type GS = {
  scoutingSessionId: ScoutingSessionId;
  boole: boolean;
  preloaded: boolean;
  teamNumber: number;
  currentPhase: Phase;
  isRed: boolean;
  message: string;
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
