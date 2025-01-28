import Mode from '../common/modes.ts';
import { lazy } from 'react';

export const start_climb: Mode = {
  label: 'Start Climbing',
  url: '/start-climb',
  view: lazy(() => import('../views/StartClimb.tsx')),
};
