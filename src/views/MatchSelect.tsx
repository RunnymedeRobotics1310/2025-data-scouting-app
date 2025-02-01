import { match_config } from '../modes/match_config.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getTeamsForMatch } from '../functions/getTeamsForMatch.ts';

function MatchSelect() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [matchNumber, setMatchNumber] = useState(0);
  const [lineup, setLineup] = useState<number[] | undefined>();
  const [teamNumber, setTeamNumber] = useState(0);
  const [checked, setChecked] = useState(false);

  return (
    <>
      <h1>Match Select</h1>

      <label htmlFor={'name'}>
        Name
        <input
          type={'text'}
          id={'name'}
          onChange={e => setName(e.target.value)}
        />
      </label>

      <label htmlFor={'name'}>
        Match Number
        <input
          type={'number'}
          id={'matchNumber'}
          onChange={e => {
            const n = e.target.valueAsNumber;
            if (n > 0 && n <= 1000) {
              setMatchNumber(n);
              setLineup(getTeamsForMatch(n));
            } else {
              setMatchNumber(0);
              setLineup(undefined);
            }
          }}
        />
      </label>

      {lineup && (
        <>
          <button>{lineup[0]}</button>
          <button>{lineup[1]}</button>
          <button>{lineup[2]}</button>
          <br />
          <button>{lineup[3]}</button>
          <button>{lineup[4]}</button>
          <button>{lineup[5]}</button>
        </>
      )}

      <label htmlFor={'rematch'}>
        <input
          type={'checkbox'}
          checked={checked}
          id={'rematch'}
          onChange={() => setChecked(!checked)}
        />
        Rematch
      </label>
      <button onClick={() => navigate(match_config.url)}>Next ---&gt;</button>
      <br />
      <img
        src={'/requirements/screens/match-select.jpeg'}
        width={'25%'}
        alt={'Match Select'}
      />
    </>
  );
}
export default MatchSelect;
