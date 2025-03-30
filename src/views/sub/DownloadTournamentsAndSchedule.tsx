import { useEffect, useState } from 'react';
import { useSchedule, useTournamentList } from '../../storage/ravenbrain.ts';
import { Tournament } from '../../types/Tournament.ts';
import Spinner from '../../common/Spinner.tsx';
import { ScheduleItem } from '../../types/ScheduleItem.ts';

function DownloadTournamentsAndSchedule() {
  const [loadTournaments, setLoadTournaments] = useState(false);
  function handleDownloadClick() {
    setLoadTournaments(true);
  }
  function LoadingTournaments() {
    const { list, error, loading } = useTournamentList();

    useEffect(() => {
      if (list && list.length > 0) {
        const tournaments: Tournament[] = [];
        list.forEach(t => {
          tournaments.push({
            id: t.id,
            name: t.name,
            startDate: new Date(t.startTime),
            scheduleGoogleSheetId: '-',
            eventLogGoogleSheetId: '-',
          });
        });
        localStorage.setItem('rrAllTournaments', JSON.stringify(tournaments));
      }
    }, [list]);

    if (loading) {
      return (
        <div>
          <Spinner />
          Loading tournament list...
        </div>
      );
    }
    if (error) {
      return <div>Error loading tournaments: {error}</div>;
    }

    return (
      <div>
        <p>Tournament List Updated</p>
        <p>Loading schedule data</p>
        <ul>
          {list.map(tournament => (
            <LoadSchedule key={tournament.id} tournament={tournament} />
          ))}
        </ul>
      </div>
    );
  }
  type LoadScheduleProps = {
    tournament: any;
  };
  function LoadSchedule(props: LoadScheduleProps) {
    const { tournament } = props;
    const { matches, error, loading } = useSchedule(tournament.id);
    if (loading) {
      return (
        <li>
          <Spinner />
          Loading schedule for {tournament.name}...
        </li>
      );
    }
    if (error) {
      return (
        <li>
          Error loading schedule for {tournament.name}: {error}
        </li>
      );
    }
    if (matches) {
      const items: ScheduleItem[] = [];
      matches.forEach(m => {
        items.push({
          match: m.match,
          red1: m.red1,
          red2: m.red2,
          red3: m.red3,
          blue1: m.blue1,
          blue2: m.blue2,
          blue3: m.blue3,
        });
      });
      localStorage.setItem(
        'rrSchedule-' + tournament.id,
        JSON.stringify(items),
      );
    }
    return <li>{tournament.name}</li>;
  }
  return (
    <div>
      <h3>Download Tournaments And Schedule</h3>
      <p>
        Download tournament and schedule data before scouting matches. This only
        needs to be done once per tournament. Schedule data for all tournaments
        will be downloaded every time.
      </p>
      {loadTournaments ? (
        <LoadingTournaments />
      ) : (
        <button onClick={() => handleDownloadClick()}>
          Download Tournament & Schedule Data
        </button>
      )}
    </div>
  );
}

export default DownloadTournamentsAndSchedule;
