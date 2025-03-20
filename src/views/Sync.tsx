import { useEffect, useState } from 'react';
import { GOOGLE_CLIENT_ID, TOURNAMENT_SPREADSHEET_ID } from '../App.tsx';
import { Tournament } from '../types/Tournament.ts';
import { ScheduleItem } from '../types/ScheduleItem.ts';
import { Schedule } from '../types/Schedule.ts';
import {
  getAllTournaments,
  getScoutedSessionsForTournament,
  getScoutedTournaments,
  getUnsynchronizedEventsForSession,
  stringifyKey,
  updateEventSyncStatus,
} from '../storage/util.ts';
import { useNavigate } from 'react-router-dom';
import { asMap, GameEvent } from '../types/GameEvent.ts';
import Loading from '../common/Loading.tsx';

export default function Sync() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [isGapiLoaded, setIsGapiLoaded] = useState(false);
  const [isGisLoaded, setIsGisLoaded] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [unsyncCount, setUnsyncCount] = useState(0);
  const [changed, setChanged] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // TODO(developer): Set to client ID and API key from the Developer Console

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES =
    'https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/spreadsheets';

  const apiKey = localStorage.getItem('rrGoogleApiKey');
  useEffect(() => {
    if (!isGapiLoaded) {
      // console.log('Loading gapi');
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.onload = () => {
        setIsGapiLoaded(true);
        gapiLoaded();
      };
      document.body.append(script);
    }
  }, []);

  useEffect(() => {
    if (!isGisLoaded) {
      // console.log('Loading gis');
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = () => {
        setIsGisLoaded(true);
        gisLoaded();
      };
      document.body.append(script);
    }
  }, []);
  /**
   * Callback after api.js is loaded.
   */
  function gapiLoaded() {
    // console.log('gapiLoaded');
    // @ts-ignore
    window.gapi.load('client', initializeGapiClient);
  }

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  async function initializeGapiClient() {
    // @ts-ignore
    await window.gapi.client.init({
      apiKey: apiKey,
      discoveryDocs: [
        'https://sheets.googleapis.com/$discovery/rest?version=v4',
      ],
    });
    // console.log('gapi client initialized');
    setGapiInited(true);
    if (gapiInited && gisInited) {
      setAuthenticated(true);
    }
  }

  /**
   * Callback after Google Identity Services are loaded.
   */
  function gisLoaded() {
    // console.log('gisLoaded');
    // @ts-ignore
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });
    // console.log('token client initialized');
    setTokenClient(client);
    setGisInited(true);
    if (gapiInited && gisInited) {
      setAuthenticated(true);
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

  function handleDownloadClick() {
    // @ts-ignore
    tokenClient.callback = resp => {
      if (resp.error !== undefined) {
        throw resp;
      }
      setAuthenticated(true);
      loadData();
    };

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

  function handleSyncClick() {
    // @ts-ignore
    tokenClient.callback = resp => {
      if (resp.error !== undefined) {
        throw resp;
      }
      setAuthenticated(true);
      saveEventLog();
    };

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

  /**
   *  Sign out the user upon button click.
   */
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

  async function loadData() {
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
      setContent(err.message);
      return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
      setContent('No tournament data found.');
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
      setContent(err.message + '. ');
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
    console.log('Syncing events');
    setSyncing(true);

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
              event.note,
            ];
          });
          console.log('Saving ' + rows.length + ' rows to google ', {
            session,
            rows,
          });

          try {
            const body = {
              values: rows,
            };

            // @ts-ignore
            window.gapi.client.sheets.spreadsheets.values
              .append({
                spreadsheetId: tournament.eventLogGoogleSheetId,
                range: 'A2:H',
                valueInputOption: 'RAW',
                resource: body,
                includeValuesInResponse: true,
              })

              .then(response => {
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
                    setChanged(true);
                  },
                );
              })
              .finally(() => {
                setSyncing(false);
              });
          } catch (err) {
            console.error(
              'Error synchronizing data for session',
              stringifyKey(session),
              err,
            );
            // @ts-ignore
            setContent(err.message);
            return;
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
        note: row[7],
        synchronized: true,
      } as GameEvent);
    });
    console.log('Loaded ' + items.length + ' game events from Google');
    return items;
  }

  useEffect(() => {
    let unsyncSession = 0;
    getAllTournaments().forEach(tournament => {
      getScoutedSessionsForTournament(tournament).forEach(session => {
        unsyncSession += getUnsynchronizedEventsForSession(session).length;
      });
    });
    setUnsyncCount(unsyncSession);
  }, [changed]);

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
          You have <strong>{unsyncCount}</strong> items to sync.{' '}
          {syncing && <Loading />}
        </p>

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
          You have <strong>{unsyncCount}</strong> items to sync.{' '}
          {syncing && <Loading />}
        </p>
        <p>
          You must sign in and grant access to google sheets that are shared
          with you to be able to synchronize data.
        </p>
        <button onClick={() => handleAuthenticateClick()}>Authorize</button>
        <p>&nbsp;</p>
        <button onClick={() => navigate('/')}>Return Home</button>
      </>
    );
  }
}
