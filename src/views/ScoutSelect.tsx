import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadSchedule } from '../storage/remote.ts';
import { tournament_select } from '../modes/tournament_select.ts';
import { setScout } from '../storage/util.ts';

function ScoutSelect() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const newmarket = {
    id: 'newmarket',
    name: 'New Market',
    startDate: new Date(2025, 1, 29),
  };

  return (
    <div className={'general-layout'}>
      <div className={'scout-select'}>
        <h3>Welcome back Scout! What is your name?</h3>

        <label>
          <input
            className={'center'}
            type={'text'}
            id={'name'}
            placeholder={'Name'}
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </label>

        <label className={'next-button'}>
          <button
            className={'right'}
            onClick={() => {
              setScout(name);
              loadSchedule(newmarket);
              // TODO: fixme: remove this ^
              navigate(tournament_select.url);
            }}
          >
            ^ This is my name
          </button>
        </label>
      </div>
    </div>
  );
}

export default ScoutSelect;
