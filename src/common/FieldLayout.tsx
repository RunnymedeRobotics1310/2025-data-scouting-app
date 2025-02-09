import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import TeamContext from '../context/TeamContext.tsx';
import AutoTeleopSwitch from '../buttons/AutoTeleopSwitch.tsx';
import AllianceContext from '../context/AllianceContext.tsx';

function FieldLayout() {
  const { teamNumber } = useContext(TeamContext);
  const { isRed } = useContext(AllianceContext);
  return (
    <div>
      <span className={isRed ? 'allianceRed' : 'allianceBlue'}>
        {teamNumber}
      </span>
      <button>S</button>
      <AutoTeleopSwitch />
      <button>=</button>
      <Outlet />
    </div>
  );
}
export default FieldLayout;
