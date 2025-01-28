import Mode from '../common/modes.ts';
import { lazy } from 'react';

export const match_config: Mode = {
  label: 'Match Config',
  url: '/match-config',
  view: lazy(() => import('../views/MatchConfig.tsx')),
};
