import { getResumedMode } from '../../functions/getResumedMode.ts';
import {
  getCurrentGamestate,
  getScoutingSessionId,
  getScoutName,
  handleSyncFix,
  logout,
  syncFix1Executed,
  usePrimaryRole,
  useRole,
} from '../../storage/local.ts';
import { useNavigate } from 'react-router-dom';
import { tournament_select } from '../../modes/tournament_select.ts';
import { useContext } from 'react';
import GameContext from '../../context/GameContext.tsx';
import { quick_comment } from '../../modes/quick_comment.ts';

function HomeMenu() {
  const { isAdmin, isDataScout, isExpertScout, isMember } = useRole();
  const { primaryRole } = usePrimaryRole();
  const navigate = useNavigate();
  const gamestate = getCurrentGamestate();
  const { saveGamestate } = useContext(GameContext);
  const id = getScoutingSessionId();
  const name = getScoutName();

  function handleQuickComment() {
    navigate(quick_comment.url);
  }
  function handleSelectMatch() {
    navigate(tournament_select.url);
  }

  const showFixButton = syncFix1Executed() == false && isDataScout;
  return (
    <>
      <h1>Welcome{name ? ' back ' + name + '!' : '!'}</h1>
      <p>
        Your current role is{' '}
        <strong>
          <em>{primaryRole}</em>
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
          {showFixButton && (
            <tr>
              <td>
                <button onClick={() => handleSyncFix()} className={'syncRed'}>
                  Fix a Little Oopsie
                </button>
              </td>
              <td>
                <p>
                  If you see this button, DON'T PANIC, but all of your hard work
                  has not been synchronized yet to Raven Brain. By clicking this
                  button, your data will go back to "unsychronized", and the
                  sync icon will turn red. You can then sync your data and all
                  will be well.
                </p>
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
                <p>Start scouting a new match.</p>
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
            <>
              <tr>
                <td>
                  <br />
                  <br />
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <button
                    onClick={() => {
                      navigate('/reports/tournament');
                    }}
                  >
                    Tournament Reports
                  </button>
                </td>
                <td>
                  Tournament reports showing scouting dagta. Internet access
                  required. Desktop or tablet recommended.
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    onClick={() => {
                      navigate('/reports/team');
                    }}
                  >
                    Team Reports
                  </button>
                </td>
                <td>
                  Summary of report data for a given team. Internet access
                  required. Desktop or tablet recommended.
                </td>
              </tr>
            </>
          )}
          {isAdmin && (
            <>
              <tr>
                <td>
                  <br />
                  <br />
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <button
                    onClick={() => {
                      navigate('/admin/tournament');
                    }}
                  >
                    Tournaments
                  </button>
                </td>
                <td>
                  Administer tournaments in the system. Internet access
                  required. Suitable for mobile and desktop devices.
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    onClick={() => {
                      navigate('/admin/schedule');
                    }}
                  >
                    Schedules
                  </button>
                </td>
                <td>
                  Administer schedule list. Internet access required. Suitable
                  for mobile and desktop devices.
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    onClick={() => {
                      navigate('/admin/unsync');
                    }}
                  >
                    Unsynchronize
                  </button>
                </td>
                <td>
                  In rare cases you may need to unsynchronize data. Do this with
                  a RavenEye developer only.
                </td>
              </tr>
            </>
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
