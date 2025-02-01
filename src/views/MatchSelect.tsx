import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getTeamsForMatch } from '../functions/getTeamsForMatch.ts';
import { selectMatch } from '../functions/selectMatch.ts';

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
          <button
            id={'red1'}
            onClick={() => {
              setTeamNumber(lineup[0]);
            }}
            disabled={teamNumber == lineup[0]}
          >
            {lineup[0]}
          </button>
          <button
            id={'red2'}
            onClick={() => {
              setTeamNumber(lineup[1]);
            }}
            disabled={teamNumber == lineup[1]}
          >
            {lineup[1]}
          </button>
          <button
            id={'red3'}
            onClick={() => {
              setTeamNumber(lineup[2]);
            }}
            disabled={teamNumber == lineup[2]}
          >
            {lineup[2]}
          </button>
          <br />
          <button
            id={'blue1'}
            onClick={() => {
              setTeamNumber(lineup[3]);
            }}
            disabled={teamNumber == lineup[3]}
          >
            {lineup[3]}
          </button>
          <button
            id={'blue2'}
            onClick={() => {
              setTeamNumber(lineup[4]);
            }}
            disabled={teamNumber == lineup[4]}
          >
            {lineup[4]}
          </button>
          <button
            id={'blue3'}
            onClick={() => {
              setTeamNumber(lineup[5]);
            }}
            disabled={teamNumber == lineup[5]}
          >
            {lineup[5]}
          </button>
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
      <button
        onClick={() =>
          navigate(selectMatch(name, matchNumber, teamNumber, checked).url)
        }
      >
        Next ---&gt;
      </button>
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
