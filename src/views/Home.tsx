import { Link, useNavigate } from 'react-router-dom';
import { scout_select } from '../modes/scout_select.ts';
import { getScoutingSessionId } from '../storage/util.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';
import { getResumedMode } from '../functions/getResumedMode.ts';

export default function Home() {
  const navigate = useNavigate();
  const { saveGamestate } = useContext(GameContext);
  const id = getScoutingSessionId();
  const gamestateString = localStorage.getItem('rrCurrentGamestate');
  let gamestate = null;
  if (gamestateString) {
    gamestate = JSON.parse(gamestateString);
  }

  return (
    <>
      <h1>Welcome!</h1>
      <label>
        <Link to={scout_select.url}>Select Match</Link>
      </label>

      {id && gamestate && id.matchId > 0 && (
        <label>
          <button
            className={'resume-button'}
            onClick={() => {
              saveGamestate(gamestate);
              navigate(getResumedMode(gamestate).url);
            }}
          >
            Resume Match
          </button>
        </label>
      )}
    </>
  );
}
