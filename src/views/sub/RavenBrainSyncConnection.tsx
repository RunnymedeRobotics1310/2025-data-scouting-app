import { useEffect, useState } from 'react';
import { authenticate, rbfetch } from '../../storage/ravenbrain.ts';
import Spinner from '../../common/Spinner.tsx';
import { useNavigate } from 'react-router-dom';
import { saveJwt } from '../../storage/util.ts';

function RavenBrainSyncConnection() {
  const navigate = useNavigate();
  const [alive, setAlive] = useState(false);
  const [error, setError] = useState<string>('');
  const [validated, setValidated] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (!alive) {
      rbfetch(`/api/ping`, {})
        .then(resp => {
          if (resp.ok) {
            setAlive(true);
          }
        })
        .catch(e => {
          setError('Ping failed: ' + e);
        });
    }
  }, []);

  useEffect(() => {
    if (error == '' && alive && !authenticated) {
      authenticate()
        .then(resp => {
          setAuthenticated(true);
          saveJwt(resp.access_token);
        })
        .catch(e => {
          setError('Authentication failed: ' + e.message);
        });
    }
  }, [error, alive, authenticated]);

  useEffect(() => {
    if (authenticated && !validated) {
      rbfetch(`/api/validate`, {})
        .then(resp => {
          if (resp.ok) {
            setValidated(true);
          }
        })
        .catch(e => {
          setError('Validation failed: ' + e);
        });
    }
  }, [authenticated, validated]);

  if (!error && !authenticated) {
    return (
      <section>
        <h2>Connecting to Raven Brain</h2>
        <p>Connecting... Please wait.</p>
        <Spinner />
        <button onClick={() => navigate('/')}>Return Home</button>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2>Error Connecting to Raven Brain</h2>
        <ul>
          <li>Host is accessible? {alive ? 'YES' : 'NO'}</li>
          <li>Successfully authenticated? {authenticated ? 'YES' : 'NO'}</li>
          <li>Reason: {error}</li>
        </ul>
        <button onClick={() => navigate('/')}>Return Home</button>
      </section>
    );
  }

  if (!validated) {
    return (
      <section>
        <h2>Validating Connection to Raven Brain</h2>
        <p>
          You have been successfully authenticated, but we are confirming that
          secured requests can be made successfully. If you see this message for
          <strong> more than 2 seconds</strong> please contact the developer.
        </p>
        <Spinner />
        <button onClick={() => navigate('/')}>Return Home</button>
      </section>
    );
  }

  return (
    <div>
      <h2>Connected to Raven Brain</h2>
    </div>
  );
}

export default RavenBrainSyncConnection;
