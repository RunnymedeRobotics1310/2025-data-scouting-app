import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { getTeamsForMatch } from '../functions/getTeamsForMatch.ts';
import { selectMatch } from '../functions/selectMatch.ts';
import { Tournament } from '../types/Tournament.ts';
import {
  setMatchNumber,
  setScoutingSessionId,
  setTeam,
} from '../storage/util.ts';
import { DEFAULT_GAME_STATE } from '../context/GS.ts';
import GameContext from '../context/GameContext.tsx';

function MatchSelect() {
  const defaultArray = [-1, -1, -1, -1, -1, -1];
  const navigate = useNavigate();
  const [match, setMatch] = useState(0);
  const [lineup, setLineup] = useState<number[]>(defaultArray);
  const [teamNumber, setTeamNumber] = useState(-1310);
  const [alliance, setAlliance] = useState('red');
  const [checked, setChecked] = useState(false);
  const { saveGamestate } = useContext(GameContext);
  const visibility = lineup[0] > 0 ? ' ' : 'isNotVisible';

  const currentTournamentString = localStorage.getItem('rrTournament');
  let currentTournament: Tournament | null = null;
  if (currentTournamentString) {
    currentTournament = JSON.parse(currentTournamentString);
  } else {
    console.error('tournament not found');
  }

  return (
    <div className={'general-layout'}>
      <div className={'match-select'}>
        <label>
          <input
            type={'number'}
            id={'matchNumber'}
            placeholder={'Match Number'}
            onChange={e => {
              const n = e.target.valueAsNumber;
              if (n > 0 && n <= 1000 && currentTournament) {
                setMatch(n);
                const matches = getTeamsForMatch(currentTournament.id, n);
                if (matches) setLineup(matches);
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
            onClick={() => {
              setTeamNumber(lineup[0]);
              setAlliance('red');
            }}
            disabled={teamNumber == lineup[0]}
          >
            {lineup[0]}
          </button>
          <button
            className={`allianceRed ${visibility}`}
            id={'red2'}
            onClick={() => {
              setTeamNumber(lineup[1]);
              setAlliance('red');
            }}
            disabled={teamNumber == lineup[1]}
          >
            {lineup[1]}
          </button>
          <button
            className={`allianceRed ${visibility}`}
            id={'red3'}
            onClick={() => {
              setTeamNumber(lineup[2]);
              setAlliance('red');
            }}
            disabled={teamNumber == lineup[2]}
          >
            {lineup[2]}
          </button>
          <button
            className={`allianceBlue ${visibility}`}
            id={'blue1'}
            onClick={() => {
              setTeamNumber(lineup[3]);
              setAlliance('blue');
            }}
            disabled={teamNumber == lineup[3]}
          >
            {lineup[3]}
          </button>
          <button
            className={`allianceBlue ${visibility}`}
            id={'blue2'}
            onClick={() => {
              setTeamNumber(lineup[4]);
              setAlliance('blue');
            }}
            disabled={teamNumber == lineup[4]}
          >
            {lineup[4]}
          </button>
          <button
            className={`allianceBlue ${visibility}`}
            id={'blue3'}
            onClick={() => {
              setTeamNumber(lineup[5]);
              setAlliance('blue');
            }}
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
        {teamNumber > 0 && (
          <label className={'next-button'}>
            <button
              className={'right'}
              onClick={() => {
                setMatchNumber(match);
                setTeam(teamNumber);
                setScoutingSessionId(alliance);
                saveGamestate(DEFAULT_GAME_STATE);
                navigate(selectMatch(checked).url);
              }}
            >
              Next ---&gt;
            </button>
          </label>
        )}
      </div>
    </div>
  );
}
export default MatchSelect;
