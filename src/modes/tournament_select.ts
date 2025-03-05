import { Mode } from '../common/mode.ts';
import { lazy } from 'react';

export const tournament_select: Mode = {
  label: 'Scout Select',
  url: '/tournament-select',
  view: lazy(() => import('../views/TournamentSelect.tsx')),
};
