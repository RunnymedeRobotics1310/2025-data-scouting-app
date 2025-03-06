import { Mode } from '../common/mode.ts';
import Checklist from '../views/Checklist.tsx';

export const checklist: Mode = {
  label: 'Checklist',
  url: '/checklist',
  view: Checklist,
};
