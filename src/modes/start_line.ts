import { Mode } from '../common/mode.ts';
import { lazy } from 'react';

export const start_line: Mode = {
  label: 'Start Line',
  url: '/game/start-line',
  view: lazy(() => import('../views/StartLine.tsx')),
};
