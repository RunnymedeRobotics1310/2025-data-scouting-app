import { Mode } from '../common/mode.ts';
import { lazy } from 'react';

export const holding_coral: Mode = {
  label: 'Holding Coral',
  url: '/game/holding-coral',
  view: lazy(() => import('../views/HoldingCoral.tsx')),
};
