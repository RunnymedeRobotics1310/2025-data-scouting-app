import { autoConfig, RobotPosition } from '../functions/autoConfig.ts';
import { useContext, useState } from 'react';
import CoralContext from '../context/CoralContext.tsx';
import { SetPhaseButton } from '../functions/setPhase.tsx';
import { match_config } from '../modes/match_config.ts';
import { Phase } from '../common/phase.ts';

function MatchConfig() {
  // const [preloaded, setPreloaded] = useState(false);
  const [position, setPosition] = useState(RobotPosition.left);
  const { preloaded, setPreloaded } = useContext(CoralContext);
  return (
    <>
      <h1>Match Config</h1>

      <label htmlFor={'preloaded'}>
        <input
          type={'checkbox'}
          checked={preloaded}
          id={'preloaded'}
          onChange={() => setPreloaded(!preloaded)}
        />
        Preloaded
      </label>

      <button
        id={'left'}
        onClick={() => {
          setPosition(RobotPosition.left);
        }}
        disabled={position == RobotPosition.left}
      >
        Left
      </button>
      <button
        id={'center'}
        onClick={() => {
          setPosition(RobotPosition.center);
        }}
        disabled={position == RobotPosition.center}
      >
        Center
      </button>
      <button
        id={'right'}
        onClick={() => {
          setPosition(RobotPosition.right);
        }}
        disabled={position == RobotPosition.right}
      >
        Right
      </button>

      <br />

      <SetPhaseButton
        currentMode={match_config}
        desiredPhase={Phase.auto}
        label={'Start --->'}
        callback={() => autoConfig(preloaded, position)}
      />
      <br />
      <img
        src={'/requirements/screens/match-config.jpeg'}
        width={'25%'}
        alt={'Match Config'}
      />
    </>
  );
}
export default MatchConfig;
