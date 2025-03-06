import { useNavigate } from 'react-router-dom';
import Algae from '../common/Algae.tsx';
import Coral from '../common/Coral.tsx';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';
import { Phase } from '../common/phase.ts';
import { logPenalty, Penalty } from '../functions/logPenalty.ts';
import { getScoutingSessionId } from '../storage/util.ts';
import Loading from '../common/Loading.tsx';
import { getModeForUrl } from '../functions/getModeForUrl.ts';

function Penalties() {
  const navigate = useNavigate();
  const { gamestate } = useContext(GameContext);
  const { currentPhase, modeBeforePenalty } = gamestate;
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;

  const modeBeforePenaltyObj = getModeForUrl(modeBeforePenalty);

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
                  modeBeforePenaltyObj,
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
                  modeBeforePenaltyObj,
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
                  modeBeforePenaltyObj,
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
                logPenalty(
                  scoutingSessionId,
                  Penalty.other,
                  modeBeforePenaltyObj,
                ).url,
              );
            }
          }}
        >
          Other
        </button>
        <button id={'back-button'} onClick={() => navigate(modeBeforePenalty)}>
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
                modeBeforePenaltyObj,
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
                modeBeforePenaltyObj,
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
              logPenalty(scoutingSessionId, Penalty.pin, modeBeforePenaltyObj)
                .url,
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
                modeBeforePenaltyObj,
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
