import { Mode } from '../common/mode.ts';
import { lazy } from 'react';

export const penalties: Mode = {
  label: 'Penalties',
  url: '/game/penalties',
  view: lazy(() => import('../views/Penalties.tsx')),
};
