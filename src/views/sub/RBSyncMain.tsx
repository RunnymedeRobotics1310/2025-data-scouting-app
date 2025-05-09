import Spinner from '../../common/Spinner.tsx';
import { useState } from 'react';
import {
  cleanupEmptyScoutingSessions,
  getScoutedSessionsForTournament,
  getScoutedTournaments,
  getUnsynchronizedEventsForSession,
  getUnsynchronizedQuickComments,
  moveQuickComments,
  updateEventSyncStatus,
} from '../../storage/local.ts';
import { GameEvent } from '../../types/GameEvent.ts';
import { saveEvents, saveQuickComments } from '../../storage/ravenbrain.ts';
import { useUnsynchronizedItemCount } from '../../storage/useUnsynchronizedItemCount.ts';

function RBSyncMain() {
  const [errors, setErrors] = useState<string[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const unsyncCount = useUnsynchronizedItemCount();
  const [showLog, setShowLog] = useState(false);
  const [currentlySynchornizingCount, setCurrentlySynchronizingCount] =
    useState(0);

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
            setCurrentlySynchronizingCount(
              currentlySynchornizingCount + events.length,
            );
            saveEvents(events).then(results => {
              let errorCount = 0;
              let errMsg = '';
              const successfullySaved: GameEvent[] = [];
              results.map(result => {
                setCurrentlySynchronizingCount(currentlySynchornizingCount - 1);
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
                  setCurrentlySynchronizingCount(
                    currentlySynchornizingCount + 1,
                  );
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
                  setCurrentlySynchronizingCount(
                    currentlySynchornizingCount - 1,
                  );
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
    const quickComments = getUnsynchronizedQuickComments();
    if (quickComments.length > 0) {
      setCurrentlySynchronizingCount(
        currentlySynchornizingCount + quickComments.length,
      );
      console.log(
        'Saving ' + quickComments.length + ' quick comments to RavenBrain ',
        {
          quickComments,
        },
      );

      try {
        log.push(
          'Uploading ' +
            quickComments.length +
            ' quick comments to RavenBrain.',
        );
        setLog(log);

        saveQuickComments(quickComments)
          .then(results => {
            let errorCount = 0;
            let errMsg = '';
            results.map(res => {
              setCurrentlySynchronizingCount(currentlySynchornizingCount - 1);
              if (!res.success) {
                errorCount++;
                errMsg += res.reason + '\n';
              }
            });
            if (errorCount > 0) {
              const message =
                'Error saving ' +
                errorCount +
                ' quick comments.  Errors:\n' +
                errMsg;
              errors.push(message);
              setErrors(errors);
              log.push(message);
              setLog(log);
            } else {
              log.push(
                'Successfully saved ' +
                  quickComments.length +
                  ' quick comments to RavenBrain.',
              );
              setLog(log);
            }
          })
          .then(() => {
            quickComments.forEach(comment => {
              moveQuickComments(comment, true);
              log.push(
                'Moved quick comment to synchronized team: ' +
                  comment.team +
                  ' timestamp: ' +
                  comment.timestamp,
              );
              setLog(log);
            });
          });
      } catch (err: any) {
        const message = 'Error saving quick comments ' + err.message;
        errors.push(message);
        setErrors(errors);
        log.push(message);
        setLog(log);
        return;
      } finally {
      }
    }
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
      {currentlySynchornizingCount > 0 && (
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
