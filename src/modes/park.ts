import Mode from '../common/modes.ts';
import { lazy } from 'react';

export const park: Mode = {
  label: 'Park',
  url: '/game/park',
  view: lazy(() => import('../views/Park.tsx')),
};
