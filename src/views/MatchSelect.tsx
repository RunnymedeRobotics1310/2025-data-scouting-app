import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { getTeamsForMatch } from '../functions/getTeamsForMatch.ts';
import { selectMatch } from '../functions/selectMatch.ts';
import TeamContext from '../context/TeamContext.tsx';
import AllianceContext from '../context/AllianceContext.tsx';

function MatchSelect() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [matchNumber, setMatchNumber] = useState(0);
  const [lineup, setLineup] = useState<number[] | undefined>();
  const { teamNumber, setTeamNumber } = useContext(TeamContext);
  const [checked, setChecked] = useState(false);
  const { setIsRed } = useContext(AllianceContext);

  return (
    <>
      <h1>Match Select</h1>

      <input
        type={'text'}
        id={'name'}
        placeholder={'Name'}
        onChange={e => setName(e.target.value)}
      />
      <br />
      <input
        type={'number'}
        id={'matchNumber'}
        placeholder={'Match Number'}
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
      <br />
      {lineup && (
        <>
          <button
            className={'allianceRed'}
            id={'red1'}
            onClick={() => {
              setTeamNumber(lineup[0]);
              setIsRed(true);
            }}
            disabled={teamNumber == lineup[0]}
          >
            {lineup[0]}
          </button>
          <button
            className={'allianceRed'}
            id={'red2'}
            onClick={() => {
              setTeamNumber(lineup[1]);
              setIsRed(true);
            }}
            disabled={teamNumber == lineup[1]}
          >
            {lineup[1]}
          </button>
          <button
            className={'allianceRed'}
            id={'red3'}
            onClick={() => {
              setTeamNumber(lineup[2]);
              setIsRed(true);
            }}
            disabled={teamNumber == lineup[2]}
          >
            {lineup[2]}
          </button>
          <br />
          <button
            className={'allianceBlue'}
            id={'blue1'}
            onClick={() => {
              setTeamNumber(lineup[3]);
              setIsRed(false);
            }}
            disabled={teamNumber == lineup[3]}
          >
            {lineup[3]}
          </button>
          <button
            className={'allianceBlue'}
            id={'blue2'}
            onClick={() => {
              setTeamNumber(lineup[4]);
              setIsRed(false);
            }}
            disabled={teamNumber == lineup[4]}
          >
            {lineup[4]}
          </button>
          <button
            className={'allianceBlue'}
            id={'blue3'}
            onClick={() => {
              setTeamNumber(lineup[5]);
              setIsRed(false);
            }}
            disabled={teamNumber == lineup[5]}
          >
            {lineup[5]}
          </button>
        </>
      )}
      <br />
      <label htmlFor={'rematch'}>
        <input
          type={'checkbox'}
          checked={checked}
          id={'rematch'}
          onChange={() => setChecked(!checked)}
        />
        Rematch
      </label>
      <br />
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
