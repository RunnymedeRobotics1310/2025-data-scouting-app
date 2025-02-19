import { Context, createContext } from 'react';
import { GS } from './GS.ts';
import { Phase } from '../common/phase.ts';

export const DEFAULT_GAME_STATE = {
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
  setGamestate: React.Dispatch<React.SetStateAction<GS>>;
}> = createContext(DEFAULT_GAME_STATE);

export default GameContext;
