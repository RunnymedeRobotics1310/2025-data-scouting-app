export function getTeamsForMatch(
  tournamentId: string,
  matchNumber: number,
): number[] | null {
  console.log('Finding teams for match ' + matchNumber + ' at ' + tournamentId);

  const scheduleString = localStorage.getItem('rrSchedule-' + tournamentId);
  if (scheduleString) {
    const schedule = JSON.parse(scheduleString);
    const match = schedule.matches[matchNumber - 1];
    console.log({ schedule, match });
    return [
      match.red1,
      match.red2,
      match.red3,
      match.blue1,
      match.blue2,
      match.blue3,
    ];
  }

  return null;
}
