import { Mode } from '../common/mode.ts';
import { lazy } from 'react';

export const checklist: Mode = {
  label: 'Checklist',
  url: '/checklist',
  view: lazy(() => import('../views/Checklist.tsx')),
};
