import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tournament_select } from '../modes/tournament_select.ts';
import { getScoutName, saveScoutName, setScout } from '../storage/util.ts';

function ScoutSelect() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [hasApiKey, setHasApiKey] = useState(false);

  const nameSet = name && name != '';

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
      const apiKey = localStorage.getItem('rrGoogleApiKey');
      if (apiKey) {
        setHasApiKey(true);
      }
    }
  }, []);

  function renderApiKey() {
    if (hasApiKey) {
      return (
        <div>
          <button
            onClick={() => {
              localStorage.removeItem('rrGoogleApiKey');
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
                localStorage.setItem('rrGoogleApiKey', e.target.value);
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
  return (
    <div className={'general-layout'}>
      <div className={'scout-select'}>
        <div>
          <h3>Welcome back {nameSet ? name : 'Scout'}!</h3>
          <p>
            Please enter your name, and provide the access key if you haven't
            entered it already.
          </p>
        </div>

        {renderNameForm()}
        {renderApiKey()}

        <label className={'next-button'}>
          <button
            className={'right'}
            onClick={() => {
              setScout(name);
              // TODO: fixme: remove this ^
              navigate(tournament_select.url);
            }}
          >
            Continue
          </button>
        </label>
      </div>
    </div>
  );
}

export default ScoutSelect;
