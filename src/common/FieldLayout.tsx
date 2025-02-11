import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import TeamContext from '../context/TeamContext.tsx';
import GamePhaseSwitch from '../buttons/GamePhaseSwitch.tsx';
import AllianceContext from '../context/AllianceContext.tsx';
import Law from '../icons/Law.tsx';

function FieldLayout() {
  const { teamNumber } = useContext(TeamContext);
  const { isRed } = useContext(AllianceContext);
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
