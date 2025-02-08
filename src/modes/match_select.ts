import { Mode } from '../common/mode.ts';
import { lazy } from 'react';

export const match_select: Mode = {
  label: 'Match Select',
  url: '/match-select',
  view: lazy(() => import('../views/MatchSelect.tsx')),
};
