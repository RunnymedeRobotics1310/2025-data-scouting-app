import {
  getPassword,
  getScoutName,
  savePassword,
  saveScoutName,
} from '../../storage/util.ts';
import { useEffect, useState } from 'react';
import RavenBrainSyncConnection from './RavenBrainSyncConnection.tsx';

function Login() {
  const [savedName, setSavedName] = useState('');
  const [savedPassword, setSavedPassword] = useState('');
  const [formName, setFormName] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [attemptLogin, setAttemptLogin] = useState(false);

  useEffect(() => {
    if (savedName == '') {
      const loadedName = getScoutName();
      if (loadedName && loadedName != '') {
        setSavedName(loadedName);
        setFormName(loadedName);
      }
    }
  }, []);

  useEffect(() => {
    if (savedPassword == '') {
      const loadedPassword = getPassword();
      if (loadedPassword && loadedPassword != '') {
        setSavedPassword(loadedPassword);
      }
    }
  }, []);

  function handleLoginClick() {
    saveScoutName(formName);
    savePassword(formPassword);
    setAttemptLogin(true);
  }

  if (attemptLogin) {
    return <RavenBrainSyncConnection loginMode={true} />;
  }

  return (
    <div>
      <h1>Welcome to Raven Eye!</h1>
      <p>
        To use this app, you need to log in first. The app is designed to allow
        scouting and logging activity without an internet connection, but to
        sync data to the server, you will need to be online. To sync, simply
        click on the sync icon in the top right of the page. Do not reload if
        you are not online.
      </p>
      <br />
      <h3>Login</h3>
      <table className={'tools'}>
        <tbody>
          <tr>
            <td>
              <label>
                <input
                  className={'center'}
                  type={'text'}
                  id={'name'}
                  placeholder={formName == '' ? 'Name' : formName}
                  onChange={e => {
                    setFormName(e.target.value);
                  }}
                />
              </label>
            </td>
            <td>Please enter your name.</td>
          </tr>
          <tr>
            <td>
              <label>
                <input
                  className={'center'}
                  type={'password'}
                  id={'password'}
                  placeholder={'password'}
                  onChange={e => {
                    setFormPassword(e.target.value);
                  }}
                />
              </label>
            </td>
            <td>
              Enter the password that you received from the lead data scout. Do
              not share your password.
            </td>
          </tr>
          <tr>
            <td>
              <button
                disabled={formName == '' || formPassword == ''}
                onClick={() => {
                  handleLoginClick();
                }}
              >
                Log in
              </button>
            </td>
            <td>Log in. You need to be connected to the internet to log in.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default Login;
