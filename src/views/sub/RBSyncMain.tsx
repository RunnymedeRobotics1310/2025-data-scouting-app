import Spinner from '../../common/Spinner.tsx';
import { useState } from 'react';
import {
  cleanupEmptyScoutingSessions,
  getScoutedSessionsForTournament,
  getScoutedTournaments,
  getUnsynchronizedEventsForSession,
  updateEventSyncStatus,
} from '../../storage/local.ts';
import { GameEvent } from '../../types/GameEvent.ts';
import { saveEvents } from '../../storage/ravenbrain.ts';
import { useUnsynchronizedItemCount } from '../../storage/useUnsynchronizedItemCount.ts';

function RBSyncMain() {
  const [content, setContent] = useState('');
  const [syncing, setSyncing] = useState(false);
  const unsyncCount = useUnsynchronizedItemCount();

  function handleSyncClick() {
    saveEventLog();
  }

  async function saveEventLog() {
    console.log('Saving event log');

    const tournaments = getScoutedTournaments();
    tournaments.forEach(tournament => {
      const sessions = getScoutedSessionsForTournament(tournament);
      sessions.forEach(session => {
        const events: GameEvent[] = getUnsynchronizedEventsForSession(session);
        if (events.length > 0) {
          console.log('Saving ' + events.length + ' events to raven brain ', {
            session,
            events,
          });

          try {
            setContent('Uploading data.');

            setSyncing(true);
            saveEvents(events).then(results => {
              let errorCount = 0;
              let errMsg = '';
              const successfullySaved: GameEvent[] = [];
              results.map(result => {
                if (!result.success) {
                  errorCount++;
                  errMsg += result.reason + '\n';
                } else {
                  const e = {
                    ...result.eventLogRecord,
                    synchronized: true,
                  };
                  if (!(e.timestamp instanceof Date)) {
                    e.timestamp = new Date(e.timestamp);
                  }
                  successfullySaved.push(e);
                }
              });
              if (errorCount > 0) {
                setContent(
                  'Error saving ' +
                    errorCount +
                    ' events.  Errors:\n' +
                    errMsg +
                    '\nThe ' +
                    successfullySaved.length +
                    ' successfully saved events will not have to be re-synchronized.',
                );
              } else {
                setContent(
                  'Successfully saved ' +
                    successfullySaved.length +
                    " events.  You're all set!",
                );
              }
              console.log('SAVED', successfullySaved);
              for (const e of successfullySaved) {
                try {
                  updateEventSyncStatus(e);
                } catch (err) {
                  console.error('Error updating event sync status', err);
                }
                console.log('Updating event sync status', e);
              }
              setSyncing(false);
            });
          } catch (err: any) {
            reportError(
              'Error saving events for session ' +
                JSON.stringify(session) +
                ' ' +
                err.message,
            );
            return;
          } finally {
          }
        } else {
          console.info(
            'No events need synchronization for event ' +
              session.tournamentId +
              ' match ' +
              session.matchId +
              ' team ' +
              session.teamNumber,
          );
        }
        cleanupEmptyScoutingSessions();
      });
    });
  }

  return (
    <div>
      <h3>Sync Scouting Data</h3>
      <p>
        Synchronize your data with RavenBrain. Your data is stored locally on
        your browser, so it is not necessary to sync after each match. However,
        syncing will copy your data up to our repository so that the strategy
        team can analyze team performance. Simply connect to the internet with
        your device and press the sync button. You'll have to enter the password
        provided to you by the team.
      </p>
      {syncing && (
        <div>
          <Spinner />
          Syncing...
        </div>
      )}
      <button disabled={unsyncCount === 0} onClick={() => handleSyncClick()}>
        Sync Scouting Data
      </button>
      <p>&nbsp;</p>
      <h4>Sync Status Messages</h4>
      <pre id="content" className="googleExampleContentPreStyle">
        {content}
      </pre>
    </div>
  );
}
export default RBSyncMain;
