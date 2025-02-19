import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import GamePhaseSwitch from '../buttons/GamePhaseSwitch.tsx';
import Law from '../icons/Law.tsx';
import GameContext from '../context/GameContext.tsx';

function FieldLayout() {
  const { gamestate } = useContext(GameContext);
  const { teamNumber, isRed } = gamestate;
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
          <span className={'button'}>
            <Law />
          </span>
        </span>
      </header>
      <Outlet />
    </section>
  );
}
export default FieldLayout;
