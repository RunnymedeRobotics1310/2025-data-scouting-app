import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { getTeamsForMatch } from '../functions/getTeamsForMatch.ts';
import { selectMatch } from '../functions/selectMatch.ts';
import GameContext from '../context/GameContext.tsx';

function MatchSelect() {
  const defaultArray = [-1, -1, -1, -1, -1, -1];
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [match, setMatch] = useState(0);
  const [lineup, setLineup] = useState<number[]>(defaultArray);
  const { gamestate, saveGamestate } = useContext(GameContext);
  const { teamNumber } = gamestate;
  const [checked, setChecked] = useState(false);
  const visibility = lineup[0] > 0 ? ' ' : 'isNotVisible';

  return (
    <div className={'general-layout'}>
      <div className={'match-select'}>
        {/*<h1 className={'center'}>Match Select</h1>*/}

        <label>
          <input
            className={'center'}
            type={'text'}
            id={'name'}
            placeholder={'Name'}
            onChange={e => setName(e.target.value)}
          />
        </label>

        <label>
          <input
            type={'number'}
            id={'matchNumber'}
            placeholder={'Match Number'}
            onChange={e => {
              const n = e.target.valueAsNumber;
              if (n > 0 && n <= 1000) {
                setMatch(n);
                setLineup(getTeamsForMatch(n));
              } else {
                setMatch(0);
                setLineup(defaultArray);
              }
            }}
          />
        </label>

        <div className={'team-select'}>
          <button
            className={`allianceRed ${visibility}`}
            id={'red1'}
            onClick={() =>
              saveGamestate({
                ...gamestate,
                teamNumber: lineup[0],
                isRed: true,
              })
            }
            disabled={teamNumber == lineup[0]}
          >
            {lineup[0]}
          </button>
          <button
            className={`allianceRed ${visibility}`}
            id={'red2'}
            onClick={() =>
              saveGamestate({
                ...gamestate,
                teamNumber: lineup[1],
                isRed: true,
              })
            }
            disabled={teamNumber == lineup[1]}
          >
            {lineup[1]}
          </button>
          <button
            className={`allianceRed ${visibility}`}
            id={'red3'}
            onClick={() =>
              saveGamestate({
                ...gamestate,
                teamNumber: lineup[2],
                isRed: true,
              })
            }
            disabled={teamNumber == lineup[2]}
          >
            {lineup[2]}
          </button>
          <button
            className={`allianceBlue ${visibility}`}
            id={'blue1'}
            onClick={() =>
              saveGamestate({
                ...gamestate,
                teamNumber: lineup[3],
                isRed: false,
              })
            }
            disabled={teamNumber == lineup[3]}
          >
            {lineup[3]}
          </button>
          <button
            className={`allianceBlue ${visibility}`}
            id={'blue2'}
            onClick={() =>
              saveGamestate({
                ...gamestate,
                teamNumber: lineup[4],
                isRed: false,
              })
            }
            disabled={teamNumber == lineup[4]}
          >
            {lineup[4]}
          </button>
          <button
            className={`allianceBlue ${visibility}`}
            id={'blue3'}
            onClick={() =>
              saveGamestate({
                ...gamestate,
                teamNumber: lineup[5],
                isRed: false,
              })
            }
            disabled={teamNumber == lineup[5]}
          >
            {lineup[5]}
          </button>
        </div>

        <label className={'checkbox-and-label'}>
          <input
            type={'checkbox'}
            checked={checked}
            id={'rematch'}
            onChange={() => setChecked(!checked)}
          />
          <span>Rematch</span>
        </label>

        <label className={'next-button'}>
          <button
            className={'right'}
            onClick={() => {
              saveGamestate({
                ...gamestate,
                scoutName: name,
                matchNumber: match,
              });
              navigate(selectMatch(name, match, teamNumber, checked).url);
            }}
          >
            Next ---&gt;
          </button>
        </label>
      </div>
    </div>
  );
}
export default MatchSelect;
