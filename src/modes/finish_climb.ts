import Mode from '../common/modes.ts';
import { lazy } from 'react';

export const finish_climb: Mode = {
  label: 'Finish Climbing',
  url: '/finish-climb',
  view: lazy(() => import('../views/FinishClimb.tsx')),
};
