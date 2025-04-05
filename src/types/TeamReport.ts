import { QuickComment } from './QuickComment.ts';
import { TournamentReportTable } from '../views/TournamentReports.tsx';

export type TeamReport = {
  comments: QuickComment[];
  tournamentReports: TournamentReportTable[];
};
