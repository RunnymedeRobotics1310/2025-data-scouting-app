import Mode from '../common/modes.ts';
import { lazy } from 'react';

export const holding_both: Mode = {
  label: 'Holding Both',
  url: '/game/holding-both',
  view: lazy(() => import('../views/HoldingBoth.tsx')),
};
