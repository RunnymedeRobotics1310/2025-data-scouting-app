import { useNavigate } from 'react-router-dom';
import {
  getCurrentGamestate,
  getGoogleApiKey,
  getPassword,
  getScoutingSessionId,
  getScoutName,
  saveGoogleApiKey,
  savePassword,
  saveScoutName,
} from '../storage/util.ts';
import { useContext, useEffect, useState } from 'react';
import GameContext from '../context/GameContext.tsx';
import { getResumedMode } from '../functions/getResumedMode.ts';
import { tournament_select } from '../modes/tournament_select.ts';

export default function Home() {
  const navigate = useNavigate();
  const { saveGamestate } = useContext(GameContext);
  const id = getScoutingSessionId();
  const gamestate = getCurrentGamestate();
  const [name, setName] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [password, setPassword] = useState('');
  const nameSet = name && name != '';
  const passwordSet = password && password != '';
  const loggedIn = nameSet && hasApiKey && passwordSet;

  useEffect(() => {
    if (name == '') {
      const loadedName = getScoutName();
      if (loadedName && loadedName != '') {
        setName(loadedName);
      }
    }
  }, []);

  useEffect(() => {
    if (!hasApiKey) {
      const apiKey = getGoogleApiKey();
      if (apiKey || apiKey != '') {
        setHasApiKey(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!passwordSet) {
      const password = getPassword();
      if (password && password != '') {
        setPassword(password);
      }
    }
  });

  function renderApiKey() {
    if (hasApiKey) {
      return (
        <div>
          <button
            onClick={() => {
              saveGoogleApiKey('');
              setHasApiKey(false);
            }}
          >
            Change My Access Key
          </button>
        </div>
      );
    } else {
      return (
        <label>
          <input
            className={'center'}
            type={'text'}
            id={'apikey'}
            placeholder={'Access key from team lead'}
            onChange={e => {
              if (e.target.value && e.target.value !== '') {
                saveGoogleApiKey(e.target.value);
                setHasApiKey(true);
              }
            }}
          />
        </label>
      );
    }
  }
  function renderNameForm() {
    if (nameSet) {
      return (
        <div>
          <button
            onClick={() => {
              saveScoutName('');
              setName('');
            }}
          >
            Change Name from {name}
          </button>
        </div>
      );
    } else {
      return (
        <label>
          <input
            className={'center'}
            type={'text'}
            id={'name'}
            placeholder={'Name'}
            onBlur={e => {
              setName(e.target.value);
              saveScoutName(e.target.value);
            }}
          />
        </label>
      );
    }
  }
  function renderPassword() {
    if (passwordSet) {
      return (
        <div>
          <button
            onClick={() => {
              savePassword('');
              setPassword('');
            }}
          >
            Change Password
          </button>
        </div>
      );
    } else {
      return (
        <label>
          <input
            className={'center'}
            type={'text'}
            id={'password'}
            placeholder={'password'}
            onBlur={e => {
              setPassword(e.target.value);
              savePassword(e.target.value);
            }}
          />
        </label>
      );
    }
  }

  function handleSelectMatch() {
    navigate(tournament_select.url);
  }
  return (
    <>
      <h1>Welcome!</h1>

      <table className={'tools'}>
        <tbody>
          <tr>
            <td>{renderNameForm()}</td>
          </tr>
          <tr>
            <td>{renderApiKey()}</td>
          </tr>
          <tr>
            <td>{renderPassword()}</td>
          </tr>
          {loggedIn && (
            <tr>
              <td>
                <button className={''} onClick={() => handleSelectMatch()}>
                  Select Match
                </button>
              </td>
              <td>
                <p>Start scouting a new match. </p>
              </td>
            </tr>
          )}

          {loggedIn && id && gamestate && id.matchId > 0 && (
            <tr>
              <td>
                <button
                  className={'resume-button'}
                  onClick={() => {
                    saveGamestate(gamestate);
                    navigate(getResumedMode(gamestate).url);
                  }}
                >
                  Resume Match
                </button>
              </td>
              <td>
                <p>
                  Resume a match that is already underway. You can continue to
                  record events, but once recorded, an event can't be removed.
                </p>
              </td>
            </tr>
          )}

          {loggedIn && (
            <tr>
              <td>
                <button className={''} onClick={() => navigate('/sync')}>
                  Sync
                </button>
              </td>
              <td>
                <p>Synchronize Match and Scouting Data</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
