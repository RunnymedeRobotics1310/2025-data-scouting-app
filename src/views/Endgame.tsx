import { EndgameStatus, endgameStatus } from '../functions/endgameStatus.ts';
import { useState } from 'react';
import { SetPhaseButton } from '../functions/setPhase.tsx';
import { endgame } from '../modes/endgame.ts';
import { Phase } from '../common/phase.ts';

function Endgame() {
  const [climbed, setClimbed] = useState(EndgameStatus.none);

  return (
    <div className={'endgame'}>
      <h1>Endgame</h1>
      <img src="/images/logo.png" alt="Runnymede Robotics" width={'250'} />

      <div>
        <button
          id={'none'}
          onClick={() => {
            setClimbed(EndgameStatus.none);
          }}
          disabled={climbed == EndgameStatus.none}
        >
          Did not Park
        </button>
        <button
          id={'park'}
          onClick={() => {
            setClimbed(EndgameStatus.park);
          }}
          disabled={climbed == EndgameStatus.park}
        >
          Park
        </button>
        <button
          id={'shallow'}
          onClick={() => {
            setClimbed(EndgameStatus.shallow);
          }}
          disabled={climbed == EndgameStatus.shallow}
        >
          Shallow Climb
        </button>
        <button
          id={'deep'}
          onClick={() => {
            setClimbed(EndgameStatus.deep);
          }}
          disabled={climbed == EndgameStatus.deep}
        >
          Deep Climb
        </button>
      </div>
      <SetPhaseButton
        currentMode={endgame}
        desiredPhase={Phase.comments}
        label={'Next --->'}
        callback={() => endgameStatus(climbed)}
      />
      {/*<img*/}
      {/*  src={'/requirements/screens/simple-endgame.jpeg'}*/}
      {/*  width={'25%'}*/}
      {/*  alt={'Endgame'}*/}
      {/*/>*/}
    </div>
  );
}

export default Endgame;
