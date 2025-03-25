import { useEffect, useState } from 'react';
import { authenticate, rbfetch } from '../../storage/ravenbrain.ts';
import Spinner from '../../common/Spinner.tsx';
import { useNavigate } from 'react-router-dom';

function RavenBrainSyncConnection() {
  const navigate = useNavigate();
  const [alive, setAlive] = useState(false);
  const [error, setError] = useState<string>('');
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
          if (resp.ok) {
            setAuthenticated(true);
          } else if (resp.status == 401) {
            setError('Not authorized (401)');
          } else {
            setError('Unhandled error: ' + resp.status);
          }
        })
        .catch(e => {
          setError('Fetch failed: ' + e.message);
        });
    }
  }, [error, alive, authenticated]);

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

  return (
    <div>
      <h2>Connected to Raven Brain</h2>
    </div>
  );
}

export default RavenBrainSyncConnection;
