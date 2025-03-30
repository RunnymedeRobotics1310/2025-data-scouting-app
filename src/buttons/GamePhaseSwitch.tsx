import { Phase } from '../common/phase.ts';
import { useContext } from 'react';
import Loading from '../common/Loading.tsx';
import RobotHead from '../icons/RobotHead.tsx';
import Controller from '../icons/Controller.tsx';
import Shark from '../icons/Shark.tsx';
import { useNavigate } from 'react-router-dom';
import { endgame } from '../modes/endgame.ts';
import GameContext from '../context/GameContext.tsx';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { start_line } from '../modes/start_line.ts';
import { holding_both } from '../modes/holding_both.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { addEvent, getScoutingSessionId } from '../storage/local.ts';

function GamePhaseSwitch() {
  const navigate = useNavigate();
  const { gamestate, saveGamestate } = useContext(GameContext);
  const { currentPhase, left, holdingCoral, holdingAlgae } = gamestate;
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;
  if (!saveGamestate) return <Loading />;
  const autoSelected = currentPhase == Phase.auto;
  const teleopSelected = currentPhase == Phase.teleop;
  const endgameSelected = currentPhase == Phase.endgame;

  return (
    <div className={'phase-selector-switch'}>
      <div className={'phase-grid'}>
        <button
          id={'auto'}
          className={'camoButton' + (autoSelected ? ' disabled-button' : '')}
          onClick={() => {
            addEvent(
              scoutingSessionId,
              currentPhase,
              'set-phase-' + Phase.auto,
            );
            saveGamestate({ ...gamestate, currentPhase: Phase.auto });
            if (!left) {
              navigate(start_line.url);
            }
          }}
          disabled={currentPhase == Phase.auto || currentPhase == Phase.endgame}
        >
          <RobotHead />
        </button>
        <button
          id={'teleop'}
          className={'camoButton' + (teleopSelected ? ' disabled-button' : '')}
          onClick={() => {
            addEvent(
              scoutingSessionId,
              currentPhase,
              'set-phase-' + Phase.teleop,
            );
            saveGamestate({ ...gamestate, currentPhase: Phase.teleop });
            let nextMode;
            if (holdingCoral && holdingAlgae) {
              nextMode = holding_both;
            } else if (holdingCoral && !holdingAlgae) {
              nextMode = holding_coral;
            } else if (!holdingCoral && holdingAlgae) {
              nextMode = holding_algae;
            } else {
              nextMode = holding_nothing;
            }
            navigate(nextMode.url);
          }}
          disabled={currentPhase == Phase.teleop}
        >
          <Controller />
        </button>
        <button
          id={'endgame'}
          className={'camoButton' + (endgameSelected ? ' disabled-button' : '')}
          onClick={() => {
            addEvent(
              scoutingSessionId,
              currentPhase,
              'set-phase-' + Phase.endgame,
            );
            saveGamestate({ ...gamestate, currentPhase: Phase.endgame });
            navigate(endgame.url);
          }}
          disabled={currentPhase == Phase.endgame || currentPhase == Phase.auto}
        >
          <Shark />
        </button>

        <input
          type={'hidden'}
          checked={currentPhase === Phase.auto}
          onChange={() => {
            if (currentPhase === Phase.auto) {
              saveGamestate({ ...gamestate, currentPhase: Phase.teleop });
            } else {
              saveGamestate({ ...gamestate, currentPhase: Phase.auto });
            }
          }}
        />
      </div>
    </div>
  );
}
export default GamePhaseSwitch;
