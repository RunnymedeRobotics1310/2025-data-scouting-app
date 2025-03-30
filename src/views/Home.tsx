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
  const [passwordSaved, setPasswordSaved] = useState(false);
  const nameSet = name != null && name != '';
  const [loggedIn, setLoggedIn] = useState(false);

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
    if (!password || password == '') {
      const pw = getPassword();
      if (pw && pw != '') {
        setPassword(pw);
        setPasswordSaved(true);
      }
    }
  }, [password, passwordSaved]);

  useEffect(() => {
    setLoggedIn(nameSet && hasApiKey && passwordSaved);
  }, [nameSet, hasApiKey, passwordSaved]);

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
            Change API Key (this feature is about to go away)
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
            Change&nbsp;Name
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
    if (passwordSaved) {
      return (
        <div>
          <button
            onClick={() => {
              savePassword('');
              setPassword('');
              setPasswordSaved(false);
            }}
          >
            Log&nbsp;Out
          </button>
        </div>
      );
    } else {
      return (
        <label>
          <input
            className={'center'}
            type={'password'}
            id={'password'}
            placeholder={'password'}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </label>
      );
    }
  }

  function renderSavePassword() {
    return (
      <div>
        {!passwordSaved && (
          <button
            onClick={() => {
              savePassword(password);
              setPasswordSaved(true);
              console.log('saving password');
            }}
          >
            Save Password
          </button>
        )}
      </div>
    );
  }

  function handleSelectMatch() {
    navigate(tournament_select.url);
  }
  function handleQuickComment() {
    alert('Not implemented.  Blame Quentin.');
  }
  return (
    <>
      <h1>Welcome{name ? ' back ' + name + '!' : '!'}</h1>

      <table className={'tools'}>
        <tbody>
          {loggedIn && (
            <>
              <tr>
                <td>
                  <button className={''} onClick={() => handleQuickComment()}>
                    Quick&nbsp;Comment
                  </button>
                </td>
                <td>
                  <p>Record a comment about a team.</p>
                </td>
              </tr>
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
            </>
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
                  Resume&nbsp;Match
                </button>
              </td>
              <td>
                <p>
                  Resume a match that is already underway. Once recorded, an
                  event can't be removed.
                </p>
              </td>
            </tr>
          )}
          <tr>
            <td>&nbsp;</td>
            <td></td>
          </tr>
          <tr>
            <td>{renderNameForm()}</td>
            <td></td>
          </tr>
          <tr>
            <td>{renderPassword()}</td>
            <td>{renderSavePassword()}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      {renderApiKey()}
    </>
  );
}
