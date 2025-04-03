import { EndgameStatus, endgameStatus } from '../functions/endgameStatus.ts';
import { useContext, useState } from 'react';
import { SetPhaseButton } from '../functions/setPhase.tsx';
import { endgame } from '../modes/endgame.ts';
import { Phase } from '../common/phase.ts';
import logoUrl from '/src/assets/images/logo.png';
import { getScoutingSessionId } from '../storage/local.ts';
import NotFound from './NotFound.tsx';
import GameContext from '../context/GameContext.tsx';

function Endgame() {
  const [climbed, setClimbed] = useState(EndgameStatus.none);
  const scoutingSessionId = getScoutingSessionId();
  const { gamestate } = useContext(GameContext);
  const [attemptedClimb, setAttemptedClimb] = useState(false);

  if (!scoutingSessionId) return <NotFound />;
  return (
    <div className={'endgame'}>
      <h1>Endgame</h1>
      <img src={logoUrl} alt="Runnymede Robotics" width={'250'} />

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

      {climbed == EndgameStatus.park && (
        <section className={'checklist'}>
          <label className={'checkbox-and-label '}>
            <input
              type={'checkbox'}
              checked={attemptedClimb}
              id={'attempted-climb'}
              onChange={() => setAttemptedClimb(!attemptedClimb)}
            />
            <span>Attempted Climb</span>
          </label>
        </section>
      )}

      <SetPhaseButton
        currentMode={endgame}
        desiredPhase={Phase.comments}
        label={'Next --->'}
        disabled={false}
        callback={() =>
          endgameStatus(
            scoutingSessionId,
            gamestate.currentPhase,
            climbed,
            attemptedClimb,
          )
        }
      />
    </div>
  );
}

export default Endgame;
