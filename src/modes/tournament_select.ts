import { Mode } from '../common/mode.ts';
import TournamentSelect from '../views/TournamentSelect.tsx';

export const tournament_select: Mode = {
  label: 'Scout Select',
  url: '/tournament-select',
  view: TournamentSelect,
};
