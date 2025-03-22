import { useEffect, useState } from 'react';
import { GOOGLE_CLIENT_ID } from '../../App.tsx';
import SyncMain from './SyncMain.tsx';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../common/Spinner.tsx';

export function SyncGoogleApiLoader() {
  const navigate = useNavigate();
  const [isGapiLoaded, setIsGapiLoaded] = useState(false);
  const [isGisLoaded, setIsGisLoaded] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
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
  }

  if (gisInited && gapiInited) {
    return <SyncMain tokenClient={tokenClient} />;
  } else {
    return (
      <section>
        <h1>Sync</h1>
        <p>Initializing client libraries. Status:</p>
        <ul>
          <li>gapi loaded: {isGapiLoaded ? 'YES' : 'NO'}</li>
          <li>gis loaded: {isGisLoaded ? 'YES' : 'NO'}</li>
          <li>gapi inited: {gapiInited ? 'YES' : 'NO'}</li>
          <li>gis inited: {gisInited ? 'YES' : 'NO'}</li>
        </ul>
        <p>Please wait while these finish loading.</p>
        <Spinner />
        <button onClick={() => navigate('/')}>Return Home</button>
      </section>
    );
  }
}
