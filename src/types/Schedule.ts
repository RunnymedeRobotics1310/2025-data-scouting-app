import { Tournament } from './Tournament.ts';
import { ScheduleItem } from './ScheduleItem.ts';

export type Schedule = {
  tournament: Tournament;
  matches: ScheduleItem[];
};
