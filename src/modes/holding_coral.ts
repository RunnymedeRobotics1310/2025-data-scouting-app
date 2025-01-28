import Mode from '../common/modes.ts';
import { lazy } from 'react';

export const holding_coral: Mode = {
  label: 'Holding Coral',
  url: '/holding-coral',
  view: lazy(() => import('../views/HoldingCoral.tsx')),
};
