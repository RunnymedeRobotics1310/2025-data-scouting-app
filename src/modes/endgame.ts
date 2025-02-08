import { Mode } from '../common/mode.ts';
import { lazy } from 'react';

export const endgame: Mode = {
  label: 'Endgame',
  url: '/game/endgame',
  view: lazy(() => import('../views/Endgame.tsx')),
};
