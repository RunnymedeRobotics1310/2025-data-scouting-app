import { useState } from 'react';
import { TOURNAMENT_SPREADSHEET_ID } from '../../App.tsx';
import { Tournament } from '../../types/Tournament.ts';
import { ScheduleItem } from '../../types/ScheduleItem.ts';
import { Schedule } from '../../types/Schedule.ts';
import {
  getScoutedSessionsForTournament,
  getScoutedTournaments,
  getUnsynchronizedEventsForSession,
  stringifyKey,
  updateEventSyncStatus,
} from '../../storage/util.ts';
import { useNavigate } from 'react-router-dom';
import { asMap, GameEvent } from '../../types/GameEvent.ts';
import { useUnsynchronizedItemCount } from '../../storage/useUnsynchronizedItemCount.ts';
import { SyncHelp } from './SyncHelp.tsx';
import Spinner from '../../common/Spinner.tsx';

type PropTypes = {
  tokenClient: any;
};

export default function SyncMain(props: PropTypes) {
  const { tokenClient } = props;
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const unsyncCount = useUnsynchronizedItemCount();

  function reportError(message: string) {
    let msg = message;
    if (content && content.length > 2) {
      msg = content + '  \n' + message;
    }
    console.error(message);
    setContent(msg);
  }

  function getAccessToken() {
    // @ts-ignore
    if (window.gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      // @ts-ignore
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      // @ts-ignore
      tokenClient.requestAccessToken({ prompt: '' });
    }
  }

  function handleAuthenticateClick() {
    // @ts-ignore
    tokenClient.callback = resp => {
      if (resp.error !== undefined) {
        throw resp;
      }
      setAuthenticated(true);
    };
    getAccessToken();
  }

  function handleDownloadClick() {
    // @ts-ignore
    tokenClient.callback = resp => {
      if (resp.error !== undefined) {
        throw resp;
      }
      setAuthenticated(true);
      loadTournamentAndSchedule();
    };
    getAccessToken();
  }

  function handleSyncClick() {
    // @ts-ignore
    tokenClient.callback = resp => {
      if (resp.error !== undefined) {
        throw resp;
      }
      setAuthenticated(true);
      saveEventLog();
    };
    getAccessToken();
  }

  function handleSignoutClick() {
    // @ts-ignore
    const token = window.gapi.client.getToken();
    if (token !== null) {
      // @ts-ignore
      window.google.accounts.oauth2.revoke(token.access_token);
      // @ts-ignore
      window.gapi.client.setToken('');
      setContent('');
      setAuthenticated(false);
    }
  }

  async function loadTournamentAndSchedule() {
    let response;
    try {
      // Fetch first 10 files
      // @ts-ignore
      response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: TOURNAMENT_SPREADSHEET_ID,
        range: 'A2:E',
      });
    } catch (err) {
      // @ts-ignore
      reportError('Error loading tournament schedule: ' + err.message);
      return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
      reportError('No tournament data found.');
      return;
    }
    // Flatten to string to display
    const tournaments: Tournament[] = [];
    // @ts-ignore
    range.values.forEach(row => {
      tournaments.push({
        id: row[0],
        name: row[1],
        startDate: new Date(row[2]),
        scheduleGoogleSheetId: row[3],
        eventLogGoogleSheetId: row[4],
      });
    });
    // console.log('Loaded tournaments', tournaments);
    localStorage.setItem('rrAllTournaments', JSON.stringify(tournaments));

    tournaments.forEach(tournament => {
      loadSchedule(tournament);
    });
    setContent('Tournament and schedule data loaded successfully. ');
  }

  async function loadSchedule(tournament: Tournament) {
    console.log('Loading schedule for tournament', tournament.id);
    let response;
    try {
      // Fetch first 10 files
      // @ts-ignore
      response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: tournament.scheduleGoogleSheetId,
        range: 'A1:F',
      });
    } catch (err) {
      // @ts-ignore
      reportError('Error loading schedule data ' + err.message);
      return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
      console.warn(
        'No scheduled data found in spreadsheet for ',
        tournament.name,
      );
      return;
    }
    // Flatten to string to display
    const items: ScheduleItem[] = [];
    let idx = 1;
    // @ts-ignore
    range.values.forEach(row => {
      items.push({
        match: idx++,
        red1: row[0],
        red2: row[1],
        red3: row[2],
        blue1: row[3],
        blue2: row[4],
        blue3: row[5],
      });
    });
    const schedule: Schedule = {
      tournament: tournament,
      matches: items,
    };
    localStorage.setItem(
      'rrSchedule-' + tournament.id,
      JSON.stringify(schedule),
    );

    // console.log('Loaded schedule', schedule);
  }

  async function saveEventLog() {
    console.log('Saving event log');

    const tournaments = getScoutedTournaments();
    tournaments.forEach(tournament => {
      const sessions = getScoutedSessionsForTournament(tournament);
      sessions.forEach(session => {
        const events: GameEvent[] = getUnsynchronizedEventsForSession(session);
        if (events.length > 0) {
          const rows = events.map(event => {
            return [
              event.timestamp,
              event.scoutName,
              event.tournamentId,
              event.matchId,
              event.alliance,
              event.teamNumber,
              event.eventType,
              event.amount,
              event.note,
            ];
          });
          console.log('Saving ' + rows.length + ' rows to google ', {
            session,
            rows,
          });

          try {
            setContent('Uploading data.');

            const body = {
              values: rows,
            };

            setSyncing(true);
            // @ts-ignore
            window.gapi.client.sheets.spreadsheets.values
              .append({
                spreadsheetId: tournament.eventLogGoogleSheetId,
                range: 'A2:I',
                valueInputOption: 'RAW',
                resource: body,
                includeValuesInResponse: true,
              })

              .then(() => {
                const eventsMap = asMap(events);
                readEventLog(tournament.eventLogGoogleSheetId).then(
                  eventsReadFromGoogle => {
                    const googleMap = asMap(eventsReadFromGoogle);
                    const successfullySaved: GameEvent[] = [];
                    for (const emk of eventsMap.keys()) {
                      const gme = googleMap.get(emk);
                      const em = eventsMap.get(emk);
                      if (em === undefined) {
                        console.warn(
                          'Unexpectedly found no mapped value for key ',
                          emk,
                        );
                      } else if (gme) {
                        successfullySaved.push(em);
                      }
                    }
                    console.log(
                      'Marking ' +
                        successfullySaved.length +
                        ' events as synchronized',
                    );
                    for (const e of successfullySaved) {
                      e.synchronized = true;
                      updateEventSyncStatus(e);
                    }
                  },
                );
              })
              .then(() => {
                setContent('Sync complete.');
                setSyncing(false);
              });
          } catch (err: any) {
            reportError(
              'Error saving events for session ' +
                stringifyKey(session) +
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
      });
    });
  }

  async function readEventLog(
    eventLogSpreadsheetId: string,
  ): Promise<GameEvent[]> {
    // Fetch first 10 files
    // @ts-ignore
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: eventLogSpreadsheetId,
      range: 'A3:H',
    });
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
      throw Error(
        'No event log found for spreadsheet ' + eventLogSpreadsheetId,
      );
    }
    const items: GameEvent[] = [];
    // @ts-ignore
    range.values.forEach(row => {
      items.push({
        timestamp: new Date(row[0]),
        scoutName: row[1],
        tournamentId: row[2],
        matchId: row[3],
        alliance: row[4],
        teamNumber: row[5],
        eventType: row[6],
        amount: row[7],
        note: row[8],
        synchronized: true,
      } as GameEvent);
    });
    console.log('Loaded ' + items.length + ' game events from Google');
    return items;
  }

  const syncCountMessage = unsyncCount < 0 ? '(CALCULATING...)' : unsyncCount;
  /*
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   *
   *                                 DISPLAY
   *
   *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   */

  if (authenticated) {
    return (
      <>
        <h2>Tournament & Schedule Data</h2>

        <p>
          You have <strong>{syncCountMessage}</strong> items to sync.{' '}
        </p>
        {syncing && (
          <div>
            <Spinner />
            Syncing...
          </div>
        )}

        <p>
          Download tournament and schedule data before scouting matches. This
          only needs to be done once per tournament. Schedule data for all
          tournaments will be downloaded every time.
        </p>
        <button onClick={() => handleDownloadClick()}>
          Download Tournament & Schedule Data
        </button>
        <p>
          Synchronize your data with our online spreadsheets. Your data is
          stored locally on your browser, so it is not necessary to sync after
          each match. However, syncing will copy your data up to our Google
          Drive so that the strategy team can analyze team performance. Simply
          connect to the internet with your device and press the sync button.
          You'll have to enter the password provided to you by the team.
        </p>
        <button onClick={() => handleSyncClick()}>Sync Scouting Data</button>
        <p>Sign out once complete.</p>
        <button onClick={() => handleSignoutClick()}>Sign Out</button>
        <p>&nbsp;</p>
        <button onClick={() => navigate('/')}>Return Home</button>
        <h4>Sync Status Messages</h4>
        <pre id="content" className="googleExampleContentPreStyle">
          {content}
        </pre>
      </>
    );
  } else {
    return (
      <>
        <h1>Synchronize Data</h1>
        <p>
          You have <strong>{syncCountMessage}</strong> items to sync.{' '}
        </p>
        {syncing && (
          <div>
            <Spinner />
            Syncing...
          </div>
        )}
        <p>
          You must sign in and grant access to google sheets that are shared
          with you to be able to synchronize data.
        </p>
        <button onClick={() => handleAuthenticateClick()}>Authorize</button>
        <p>&nbsp;</p>
        <button onClick={() => setShowHelp(!showHelp)}>
          {showHelp ? 'Hide Help' : 'Show Help'}
        </button>
        <button onClick={() => navigate('/')}>Return Home</button>
        {showHelp && <SyncHelp />}
      </>
    );
  }
}
