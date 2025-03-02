import { createContext } from 'react';
import { GameContextType } from './GameContextType.ts';
import { DEFAULT_GAME_STATE, GS } from './GS.ts';

const GameContext = createContext<GameContextType>({
  gamestate: DEFAULT_GAME_STATE,
  saveGamestate: (state: GS) => {
    console.log('Saving Gamestate using default context,', state);
  },
});
export default GameContext;
