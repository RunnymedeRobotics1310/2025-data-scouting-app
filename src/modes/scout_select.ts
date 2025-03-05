import { Mode } from '../common/mode.ts';
import { lazy } from 'react';

export const scout_select: Mode = {
  label: 'Scout Select',
  url: '/scout-select',
  view: lazy(() => import('../views/ScoutSelect.tsx')),
};
