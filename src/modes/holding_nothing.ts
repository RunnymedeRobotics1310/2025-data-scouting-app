import Mode from '../common/modes.ts';
import { lazy } from 'react';

export const holding_nothing: Mode = {
  label: 'Holding Nothing',
  url: '/holding-nothing',
  view: lazy(() => import('../views/HoldingNothing.tsx')),
};
