import { useEffect, useState } from 'react';
import { authenticate, ping, validate } from '../../storage/ravenbrain.ts';
import Spinner from '../../common/Spinner.tsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout, saveJwt, saveRole } from '../../storage/util.ts';

type PropTypes = {
  loginMode: boolean;
};
function RavenBrainSyncConnection(props: PropTypes) {
  const loginMode = props.loginMode;
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [alive, setAlive] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [validated, setValidated] = useState(false);

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
        .then(role => {
          if (role) {
            setValidated(true);
            saveRole(role);
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
        <h2>
          {loginMode ? 'Login failed' : 'Error Connecting to Raven Brain'}
        </h2>
        <ul>
          <li>Host is accessible? {alive ? 'YES' : 'NO'}</li>
          <li>Successfully authenticated? {authenticated ? 'YES' : 'NO'}</li>
          <li>Reason: {error}</li>
        </ul>
        <button
          onClick={() => (loginMode ? window.location.reload() : navigate('/'))}
        >
          {loginMode ? 'Try again' : 'Return Home'}
        </button>
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

  if (loginMode) {
    window.location.reload();
  }
  return (
    <section>
      <Outlet />
    </section>
  );
}

export default RavenBrainSyncConnection;
