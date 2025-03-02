import { GS } from './GS.ts';

export type GameContextType = {
  gamestate: GS;
  saveGamestate: (state: GS) => void;
};
