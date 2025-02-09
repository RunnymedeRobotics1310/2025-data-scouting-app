import { Phase } from '../common/phase.ts';
import { useContext } from 'react';
import PhaseContext from '../context/PhaseContext.tsx';
import Loading from '../common/Loading.tsx';
import RobotHead from '../icons/RobotHead.tsx';
import Controller from '../icons/Controller.tsx';
import Shark from '../icons/Shark.tsx';

function AutoTeleopSwitch() {
  const { currentPhase, setCurrentPhase } = useContext(PhaseContext);
  if (!setCurrentPhase) return <Loading />;

  return (
    <div className={'phase-selector-switch'}>
      <span className={'button'}>
        <RobotHead />
      </span>
      <span className={'button'}>
        <Controller />
      </span>
      <span className={'button'}>
        <Shark />
      </span>

      <input
        type={'hidden'}
        // type={'checkbox'}
        checked={currentPhase === Phase.auto}
        onChange={() => {
          if (currentPhase === Phase.auto) {
            setCurrentPhase(Phase.teleop);
          } else {
            setCurrentPhase(Phase.auto);
          }
        }}
      />
    </div>
  );
}
export default AutoTeleopSwitch;
