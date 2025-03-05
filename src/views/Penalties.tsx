import { useNavigate } from 'react-router-dom';
import Algae from '../common/Algae.tsx';
import Coral from '../common/Coral.tsx';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';
import { Phase } from '../common/phase.ts';
import { logPenalty, Penalty } from '../functions/logPenalty.ts';
import { getScoutingSessionId } from '../storage/util.ts';
import Loading from '../common/Loading.tsx';

function Penalties() {
  const navigate = useNavigate();
  const { gamestate } = useContext(GameContext);
  const { currentPhase, modeBeforePenalty } = gamestate;
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;

  function PLayout(props: any) {
    return (
      <div className={'penalties'}>
        <h1>Penalties</h1>
        {props.children}
        <button
          onClick={() => {
            if (scoutingSessionId) {
              navigate(
                logPenalty(
                  scoutingSessionId,
                  Penalty.offLimitContact,
                  modeBeforePenalty,
                ).url,
              );
            }
          }}
        >
          Off-limit contact
        </button>
        <button
          onClick={() => {
            if (scoutingSessionId) {
              navigate(
                logPenalty(
                  scoutingSessionId,
                  Penalty.fieldDamage,
                  modeBeforePenalty,
                ).url,
              );
            }
          }}
        >
          Field Damage
        </button>
        <button
          onClick={() => {
            if (scoutingSessionId) {
              navigate(
                logPenalty(
                  scoutingSessionId,
                  Penalty.tooManyGamePieces,
                  modeBeforePenalty,
                ).url,
              );
            }
          }}
        >
          Too many <Algae />/<Coral />
        </button>
        <button
          onClick={() => {
            if (scoutingSessionId) {
              navigate(
                logPenalty(scoutingSessionId, Penalty.other, modeBeforePenalty)
                  .url,
              );
            }
          }}
        >
          Other
        </button>
        <button
          id={'back-button'}
          onClick={() => navigate(modeBeforePenalty.url)}
        >
          Back to Field
        </button>
      </div>
    );
  }

  if (currentPhase == Phase.auto) {
    return (
      <PLayout>
        <button
          onClick={() => {
            navigate(
              logPenalty(
                scoutingSessionId,
                Penalty.opponentContact,
                modeBeforePenalty,
              ).url,
            );
          }}
        >
          Opponent Contact
        </button>
        <button
          onClick={() => {
            navigate(
              logPenalty(
                scoutingSessionId,
                Penalty.throwingAlgae,
                modeBeforePenalty,
              ).url,
            );
          }}
        >
          Throwing <Algae />
        </button>
      </PLayout>
    );
  }

  if (currentPhase == Phase.teleop || currentPhase == Phase.endgame) {
    return (
      <PLayout>
        <button
          onClick={() => {
            navigate(
              logPenalty(scoutingSessionId, Penalty.pin, modeBeforePenalty).url,
            );
          }}
        >
          Pin
        </button>
        <button
          onClick={() => {
            navigate(
              logPenalty(
                scoutingSessionId,
                Penalty.zoneViolation,
                modeBeforePenalty,
              ).url,
            );
          }}
        >
          Zone Violation
        </button>
      </PLayout>
    );
  }

  return (
    <PLayout>
      <p>Invalid Phase</p>
    </PLayout>
  );
}

export default Penalties;
