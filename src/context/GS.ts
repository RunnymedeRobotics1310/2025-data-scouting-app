import { Phase } from '../common/phase.ts';
import { Mode } from '../common/mode.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';

export type GS = {
  scoutingSessionId: ScoutingSessionId;

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

const DEFAULT_SESSION_ID = {
  tournamentId: 'elkhart-lake',
  scoutName: 'Quentin the Not-so-Great',
  matchId: -1,
  alliance: 'orange',
  teamNumber: -1310,
} as ScoutingSessionId;

export const DEFAULT_GAME_STATE = {
  scoutingSessionId: DEFAULT_SESSION_ID,

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
