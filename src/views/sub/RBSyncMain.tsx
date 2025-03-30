import SyncCount from './SyncCount.tsx';
import Spinner from '../../common/Spinner.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  useScheduleDetail,
  useTournamentList,
} from '../../storage/ravenbrain.ts';
import { Tournament } from '../../types/Tournament.ts';

function RBSyncMain() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [syncing, setSyncing] = useState(false);

  const [loadTournaments, setLoadTournaments] = useState(false);
  function handleDownloadClick() {
    setLoadTournaments(true);
  }

  const [doSync, setDoSync] = useState(false);
  function handleSyncClick() {
    console.log("Help me, I'm syncing!");
  }
  /*
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   *
   *                                 DISPLAY
   *
   *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   */

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
        {list.map(tournament => (
          <LoadSchedule key={tournament.id} tournament={tournament} />
        ))}
      </div>
    );
  }
  type LoadScheduleProps = {
    tournament: any;
  };
  function LoadSchedule(props: LoadScheduleProps) {
    const { tournament } = props;
    const { schedule, error, loading } = useScheduleDetail(tournament.id);
    if (loading) {
      return (
        <div>
          <Spinner />
          Loading schedule for {tournament.name}...
        </div>
      );
    }
    if (error) {
      return (
        <div>
          Error loading schedule for {tournament.name}: {error}
        </div>
      );
    }
    console.log('Save schedule data here!', schedule); // todo: fixme; save data to local repo
    return <div>Schedule for {tournament.name} loaded</div>;
  }
  return (
    <div>
      <h2>Tournament & Schedule Data</h2>
      <SyncCount />
      {syncing && (
        <div>
          <Spinner />
          Syncing...
        </div>
      )}

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
      <p>
        Synchronize your data with RavenBrain. Your data is stored locally on
        your browser, so it is not necessary to sync after each match. However,
        syncing will copy your data up to our repository thatsymotion-s) the
        strategy team can analyze team performance. Simply connect to the
        internet with your device and press the sync button. You'll have to
        enter the password provided to you by the team.
      </p>
      <button onClick={() => handleSyncClick()}>Sync Scouting Data</button>
      <p>&nbsp;</p>
      <button onClick={() => navigate('/')}>Return Home</button>
      <h4>Sync Status Messages</h4>
      <pre id="content" className="googleExampleContentPreStyle">
        {content}
      </pre>
    </div>
  );
}
export default RBSyncMain;
