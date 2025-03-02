import { Context, createContext } from 'react';
import { GS } from './GS.ts';
import { Phase } from '../common/phase.ts';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';

const defaultSessionId: ScoutingSessionId = {
  tournament: 'elkhartLake',
  scout: 'Quentin the Not-so-Great',
  match: -1,
  team: -1310,
};

export const DEFAULT_GAME_STATE = {
  scoutingSessionId: defaultSessionId,
  boole: false,
  preloaded: false,
  teamNumber: 0,
  currentPhase: Phase.pre_match,
  isRed: true,
  message: 'foo',
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

const GameContext: Context<{
  gamestate: GS;
  // setGamestate: React.Dispatch<React.SetStateAction<GS>>;
  saveGamestate: (state: GS) => void;
}> = createContext(DEFAULT_GAME_STATE);

export default GameContext;
