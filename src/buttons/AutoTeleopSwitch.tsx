import { Phase } from '../common/phase.ts';
import { useContext } from 'react';
import PhaseContext from '../context/PhaseContext.tsx';
import Loading from '../common/Loading.tsx';

function AutoTeleopSwitch() {
  const { currentPhase, setCurrentPhase } = useContext(PhaseContext);
  if (!setCurrentPhase) return <Loading />;

  return (
    <>
      <button>Auto</button>
      <button>Teleop</button>
      <button>Endgame</button>
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
    </>
  );
}
export default AutoTeleopSwitch;
