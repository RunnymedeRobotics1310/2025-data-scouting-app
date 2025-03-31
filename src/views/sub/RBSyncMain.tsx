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
  const [errors, setErrors] = useState<string[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [syncing, setSyncing] = useState(false);
  const unsyncCount = useUnsynchronizedItemCount();
  const [showLog, setShowLog] = useState(false);

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
          console.log('Saving ' + events.length + ' events to RavenBrain ', {
            session,
            events,
          });

          try {
            log.push(
              'Uploading ' +
                events.length +
                ' events for ' +
                session.tournamentId +
                ' match ' +
                session.matchId +
                ' team ' +
                session.teamNumber +
                ' to RavenBrain.',
            );
            setLog(log);

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
                const message =
                  'Error saving ' +
                  errorCount +
                  ' events.  Errors:\n' +
                  errMsg +
                  '\nThe ' +
                  successfullySaved.length +
                  ' successfully saved events will not have to be re-synchronized.';
                errors.push(message);
                setErrors(errors);
                log.push(message);
                setLog(log);
              } else {
                log.push(
                  'Successfully saved ' +
                    successfullySaved.length +
                    ' events to RavenBrain.',
                );
                setLog(log);
              }
              for (const e of successfullySaved) {
                try {
                  updateEventSyncStatus(e);
                } catch (err) {
                  console.error('Error updating event sync status', err);
                }
                log.push(
                  'Updated event sync status for event ' +
                    e.tournamentId +
                    ' match ' +
                    e.matchId +
                    ' team ' +
                    e.teamNumber,
                );
                setLog(log);
              }
              setSyncing(false);
            });
          } catch (err: any) {
            const message =
              'Error saving events for session ' +
              JSON.stringify(session) +
              ' ' +
              err.message;
            errors.push(message);
            setErrors(errors);
            log.push(message);
            setLog(log);
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
        setLog(log);
      });
      cleanupEmptyScoutingSessions();
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
      {errors.length > 0 ? (
        <>
          <h4>Sync Errors</h4>
          <pre id="content" className="googleExampleContentPreStyle">
            {errors}
          </pre>
        </>
      ) : log.length > 0 ? (
        <>
          <h4>Sync Complete</h4>
          <p>Your data has been synchronized successfully.</p>
        </>
      ) : (
        ''
      )}
      {log.length > 0 && (
        <section>
          <button onClick={() => setShowLog(!showLog)}>
            {showLog ? 'Hide Sync Log' : 'Show Nerdy Sync Details'}
          </button>
          {showLog && (
            <>
              <h4>Sync Status Messages</h4>
              <pre id="content" className="googleExampleContentPreStyle">
                {log.map(msg => msg + '\n')}
              </pre>
            </>
          )}
        </section>
      )}
    </div>
  );
}
export default RBSyncMain;
