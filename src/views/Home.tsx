import { useNavigate } from 'react-router-dom';
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

  function handleSelectMatch() {
    navigate(scout_select.url);
  }
  return (
    <>
      <h1>Welcome!</h1>

      <table className={'tools'}>
        <tbody>
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

          {id && gamestate && id.matchId > 0 && (
            <tr>
              <td>
                <button
                  className={'resume-button'}
                  onClick={() => {
                    saveGamestate(gamestate);
                    navigate(getResumedMode(gamestate).url);
                  }}
                >
                  Resume Match
                </button>
              </td>
              <td>
                <p>
                  Resume a match that is already underway. You can continue to
                  record events, but once recorded, an event can't be removed.
                </p>
              </td>
            </tr>
          )}

          <tr>
            <td>
              <button className={''} onClick={() => navigate('/sync')}>
                Sync
              </button>
            </td>
            <td>
              <p>Synchronize Match and Scouting Data</p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
