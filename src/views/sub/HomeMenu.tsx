import { getResumedMode } from '../../functions/getResumedMode.ts';
import {
  getCurrentGamestate,
  getScoutingSessionId,
  getScoutName,
  logout,
  useRole,
} from '../../storage/util.ts';
import { useNavigate } from 'react-router-dom';
import { tournament_select } from '../../modes/tournament_select.ts';
import { useContext } from 'react';
import GameContext from '../../context/GameContext.tsx';

function HomeMenu() {
  const { isAdmin, isDataScout, isExpertScout, isMember } = useRole();
  const navigate = useNavigate();
  const gamestate = getCurrentGamestate();
  const { saveGamestate } = useContext(GameContext);
  const id = getScoutingSessionId();
  const name = getScoutName();

  function handleQuickComment() {
    alert('Not implemented.  Blame Quentin.');
  }
  function handleSelectMatch() {
    navigate(tournament_select.url);
  }
  return (
    <>
      <h1>Welcome{name ? ' back ' + name + '!' : '!'}</h1>
      <p>
        Your current role is{' '}
        <strong>
          <em>
            {isAdmin
              ? 'administrator'
              : isExpertScout
                ? 'expert scout'
                : isDataScout
                  ? 'data scout'
                  : isMember
                    ? 'member'
                    : 'anonymous - please log in'}
          </em>
        </strong>
        .
      </p>
      <table className={'tools'}>
        <tbody>
          {isMember && (
            <tr>
              <td>
                <button className={''} onClick={() => handleQuickComment()}>
                  Quick&nbsp;Comment
                </button>
              </td>
              <td>
                <p>Record a comment about a team.</p>
              </td>
            </tr>
          )}
          {isDataScout && (
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
          )}

          {isDataScout && id && gamestate && id.matchId > 0 && (
            <tr>
              <td>
                <button
                  className={'resume-button'}
                  onClick={() => {
                    saveGamestate(gamestate);
                    navigate(getResumedMode(gamestate).url);
                  }}
                >
                  Resume&nbsp;Match
                </button>
              </td>
              <td>
                <p>
                  Resume a match that is already underway. Once recorded, an
                  event can't be removed.
                </p>
              </td>
            </tr>
          )}
          {isExpertScout && (
            <tr>
              <td>
                <button
                  onClick={() => {
                    alert(
                      'Not yet implemented. Quentin will create a new view for reports. That reports page will have links to our two reports.',
                    );
                  }}
                >
                  Reports
                </button>
              </td>
              <td>
                View scouting reports. Internet access required. Desktop or
                tablet recommended.
              </td>
            </tr>
          )}
          {isAdmin && (
            <tr>
              <td>
                <button
                  onClick={() => {
                    alert(
                      'Not yet implemented. Quentin will create a new view for that links to the two admin screens.',
                    );
                  }}
                >
                  Administration
                </button>
              </td>
              <td>
                Administer tournament and schedule list. Internet access
                required. Suitable for mobile and desktop devices.
              </td>
            </tr>
          )}
          <tr>
            <td>
              <br />
              <br />
              <button
                onClick={() => {
                  logout();
                  window.location.reload();
                }}
              >
                Log Out
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
export default HomeMenu;
