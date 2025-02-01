import { useNavigate } from 'react-router-dom';
import { autoConfig, RobotPosition } from '../functions/autoConfig.ts';
import { useState } from 'react';

function MatchConfig() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [position, setPosition] = useState(RobotPosition.left);

  return (
    <>
      <h1>Match Config</h1>

      <label htmlFor={'preloaded'}>
        <input
          type={'checkbox'}
          checked={checked}
          id={'preloaded'}
          onChange={() => setChecked(!checked)}
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

      <button onClick={() => navigate(autoConfig(checked, position).url)}>
        Start ---&gt;
      </button>
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
