import { useNavigate } from 'react-router-dom';
import { match_select } from '../modes/match_select.ts';
import { getAllTournaments, setCurrentTournament } from '../storage/util.ts';
import Loading from '../common/Loading.tsx';
import { useState } from 'react';

function ScoutSelect() {
  const [selectedTournament, setSelectedTournament] = useState('');
  const navigate = useNavigate();
  const tournaments = getAllTournaments();
  if (!tournaments) return <Loading />;

  return (
    <div className={'general-layout'}>
      <div className={'tournament-select'}>
        <h3>I am at the following tournament:</h3>
        <label>
          <select
            value={selectedTournament}
            onChange={e => setSelectedTournament(e.target.value)}
          >
            <option value={''}> -- select --</option>
            {tournaments.map(t => {
              return <option value={t.id}>{t.name}</option>;
            })}
          </select>
        </label>
        {selectedTournament != '' && (
          <label className={'next-button'}>
            <button
              className={'right'}
              onClick={() => {
                setCurrentTournament(selectedTournament);
                console.log(selectedTournament);
                navigate(match_select.url);
              }}
            >
              Next ---&gt;
            </button>
          </label>
        )}

        <p>this page looks bad, remind me to fix it</p>
      </div>
    </div>
  );
}

export default ScoutSelect;
