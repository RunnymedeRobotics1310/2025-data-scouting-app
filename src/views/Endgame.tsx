import { EndgameStatus, endgameStatus } from '../functions/endgameStatus.ts';
import { useState } from 'react';
import { SetPhaseButton } from '../functions/setPhase.tsx';
import { endgame } from '../modes/endgame.ts';
import { Phase } from '../common/phase.ts';

function Endgame() {
  const [climbed, setClimbed] = useState(EndgameStatus.none);

  return (
    <>
      <h1>Endgame</h1>
      <br />

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
      <br />
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
      <br />

      <SetPhaseButton
        currentMode={endgame}
        desiredPhase={Phase.comments}
        label={'Next --->'}
        callback={() => endgameStatus(climbed)}
      />
      <br />
      <br />
      <img
        src={'/requirements/screens/simple-endgame.jpeg'}
        width={'25%'}
        alt={'Endgame'}
      />
    </>
  );
}

export default Endgame;
