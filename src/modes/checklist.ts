import Mode from '../common/modes.ts';
import { lazy } from 'react';

export const checklist: Mode = {
  label: 'Checklist',
  url: '/checklist',
  view: lazy(() => import('../views/Checklist.tsx')),
};
