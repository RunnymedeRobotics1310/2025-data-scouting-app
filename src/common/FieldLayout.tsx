import { Outlet, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import GamePhaseSwitch from '../buttons/GamePhaseSwitch.tsx';
import Law from '../icons/Law.tsx';
import GameContext from '../context/GameContext.tsx';
import { penalties } from '../modes/penalties.ts';
import { getModeForUrl } from '../functions/getModeForUrl.ts';

function FieldLayout() {
  const { gamestate, saveGamestate } = useContext(GameContext);
  const { teamNumber, alliance } = gamestate.scoutingSessionId;
  const isRed = alliance == 'red';
  const navigate = useNavigate();
  return (
    <section id="field-layout">
      <header>
        <span className={isRed ? 'team allianceRed' : 'team allianceBlue'}>
          Team {teamNumber}
        </span>
        <span className={'phase-selector'}>
          <GamePhaseSwitch />
        </span>
        <span className={'penalties-menu'}>
          <span
            className={'button'}
            onClick={() => {
              saveGamestate({
                ...gamestate,
                modeBeforePenalty: getModeForUrl(location.pathname),
              });
              navigate(penalties.url);
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
