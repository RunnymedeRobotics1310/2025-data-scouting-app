import { Phase } from '../common/phase.ts';
import { useContext } from 'react';
import PhaseContext from '../context/PhaseContext.tsx';
import Loading from '../common/Loading.tsx';
import RobotHead from '../icons/RobotHead.tsx';
import Controller from '../icons/Controller.tsx';
import Shark from '../icons/Shark.tsx';
import { useNavigate } from 'react-router-dom';
import { endgame } from '../modes/endgame.ts';
import CoralContext from '../context/CoralContext.tsx';
import { leaveStartingLine } from '../functions/leaveStartingLine.ts';

function GamePhaseSwitch() {
  const navigate = useNavigate();
  const { currentPhase, setCurrentPhase } = useContext(PhaseContext);
  const { preloaded } = useContext(CoralContext);
  if (!setCurrentPhase) return <Loading />;

  return (
    <div className={'phase-selector-switch'}>
      <button
        className={'camoButton'}
        onClick={() => setCurrentPhase(Phase.auto)} // TODO: fixme: if prevphase was startline, go back to startline
        disabled={currentPhase == Phase.auto || currentPhase == Phase.endgame}
      >
        <RobotHead />
      </button>
      <button
        className={'camoButton'}
        onClick={() => {
          setCurrentPhase(Phase.teleop);
          //TODO: fixme: this should be better. take current mode out of wherever and use that instead of the leavestartingline command
          // also if prevphase was endgame go back to the phase of whatever you were holding
          navigate(leaveStartingLine(preloaded, false).url);
        }}
        disabled={currentPhase == Phase.teleop}
      >
        <Controller />
      </button>
      <button
        className={'camoButton'}
        onClick={() => {
          setCurrentPhase(Phase.endgame);
          navigate(endgame.url);
        }}
        disabled={currentPhase == Phase.endgame || currentPhase == Phase.auto}
      >
        <Shark />
      </button>

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
export default GamePhaseSwitch;
