import { Context, createContext } from 'react';
import { GS } from './GS.ts';
import { Phase } from '../common/phase.ts';

export const DEFAULT_GAME_STATE = {
  boole: false,
  phase: Phase.pre_match,
  message: 'foo',
} as GS;

const GameContext: Context<{
  gamestate: GS;
  setGamestate: React.Dispatch<React.SetStateAction<GS>>;
}> = createContext(DEFAULT_GAME_STATE);

export default GameContext;
