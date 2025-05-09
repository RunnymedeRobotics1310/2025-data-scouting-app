import { Outlet, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import GamePhaseSwitch from '../buttons/GamePhaseSwitch.tsx';
import Law from '../icons/Law.tsx';
import GameContext from '../context/GameContext.tsx';
import { penalties } from '../modes/penalties.ts';
import { getScoutingSessionId } from '../storage/local.ts';
import Loading from './Loading.tsx';
import { myBasename } from '../App.tsx';

function FieldLayout() {
  const navigate = useNavigate();
  const { gamestate, saveGamestate } = useContext(GameContext);
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;
  const isRed = scoutingSessionId.alliance == 'red';
  return (
    <section id="field-layout">
      <header>
        <span className={isRed ? 'team allianceRed' : 'team allianceBlue'}>
          Team {scoutingSessionId.teamNumber}
        </span>
        <span className={'phase-selector'}>
          <GamePhaseSwitch />
        </span>
        <span className={'penalties-menu'}>
          <span
            className={'button'}
            onClick={() => {
              if (location.pathname != myBasename + penalties.url) {
                const currUrl = location.pathname.replace(myBasename, '');
                saveGamestate({
                  ...gamestate,
                  modeBeforePenalty: currUrl,
                });
                navigate(penalties.url);
              }
            }}
          >
            <Law />
          </span>
        </span>
      </header>
      <Outlet />
    </section>
  );
}
export default FieldLayout;
