import { GameEvent } from './GameEvent.ts';

export type GameEvents = {
  events: GameEvent[];
  lastUpdated: Date;
};
