import Mode from '../common/modes.ts';
import { lazy } from 'react';

export const holding_algae: Mode = {
  label: 'Holding Algae',
  url: '/game/holding-algae',
  view: lazy(() => import('../views/HoldingAlgae.tsx')),
};
