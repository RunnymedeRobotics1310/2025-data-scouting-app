import { Mode } from '../common/mode.ts';
import { lazy } from 'react';

export const human_feedback: Mode = {
  label: 'Human Feedback',
  url: '/human-feedback',
  view: lazy(() => import('../views/HumanFeedback.tsx')),
};
