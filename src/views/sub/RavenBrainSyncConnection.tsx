import { useEffect, useState } from 'react';
import { authenticate, ping, validate } from '../../storage/ravenbrain.ts';
import Spinner from '../../common/Spinner.tsx';
import { useNavigate } from 'react-router-dom';
import { saveJwt } from '../../storage/util.ts';

function RavenBrainSyncConnection(props) {
  const navigate = useNavigate();
  const [alive, setAlive] = useState(false);
  const [error, setError] = useState<string>('');
  const [validated, setValidated] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (!alive) {
      ping()
        .then(ok => {
          if (ok) {
            setAlive(true);
          } else {
            setError('Ping failed');
          }
        })
        .catch(e => {
          setError('Ping failed: ' + e.message);
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
      validate()
        .then(ok => {
          if (ok) {
            setValidated(true);
          } else {
            setError('Validation failed');
          }
        })
        .catch(e => {
          setError('Validation failed: ' + e.message);
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

  return <section>{props.children}</section>;
}

export default RavenBrainSyncConnection;
