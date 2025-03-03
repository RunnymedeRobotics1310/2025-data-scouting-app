import { EndgameStatus, endgameStatus } from '../functions/endgameStatus.ts';
import { useContext, useState } from 'react';
import { SetPhaseButton } from '../functions/setPhase.tsx';
import { endgame } from '../modes/endgame.ts';
import { Phase } from '../common/phase.ts';
import GameContext from '../context/GameContext.tsx';

function Endgame() {
  const [climbed, setClimbed] = useState(EndgameStatus.none);
  const { gamestate } = useContext(GameContext);
  const { scoutingSessionId } = gamestate;

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
        callback={() => endgameStatus(scoutingSessionId, climbed)}
      />
    </div>
  );
}

export default Endgame;
