import { Mode } from '../common/mode.ts';
import { lazy } from 'react';

export const holding_nothing: Mode = {
  label: 'Holding Nothing',
  url: '/game/holding-nothing',
  view: lazy(() => import('../views/HoldingNothing.tsx')),
};
