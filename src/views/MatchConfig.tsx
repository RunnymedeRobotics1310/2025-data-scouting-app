import { autoConfig, RobotPosition } from '../functions/autoConfig.ts';
import { useContext, useState } from 'react';
import { SetPhaseButton } from '../functions/setPhase.tsx';
import { match_config } from '../modes/match_config.ts';
import { Phase } from '../common/phase.ts';
import GameContext from '../context/GameContext.tsx';
import { getScoutingSessionId } from '../storage/local.ts';
import NotFound from './NotFound.tsx';
import { GS } from '../context/GS.ts';

function MatchConfig() {
  // const [preloaded, setPreloaded] = useState(false);
  const [position, setPosition] = useState(RobotPosition.left);
  const { gamestate } = useContext(GameContext);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const { preloaded } = gamestate;
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <NotFound />;
  const isRed = scoutingSessionId.alliance == 'red';

  return (
    <div className={'general-layout'}>
      <div className={'match-config'}>
        <label id={'external-team-number'}>
          <span className={isRed ? 'team allianceRed' : 'team allianceBlue'}>
            Team {scoutingSessionId.teamNumber}
          </span>
        </label>

        <label className={'checkbox-and-label'}>
          <input
            type={'checkbox'}
            checked={isPreloaded}
            id={'preloaded'}
            onChange={() => {
              setIsPreloaded(!isPreloaded);
              console.log('toggled coral');
            }}
          />
          <span>Preloaded</span>
        </label>

        {/*<h4>Position</h4>*/}

        <div>
          <section className={isRed ? 'red-auto-map' : 'blue-auto-map'}>
            <div>
              <button
                id={'left'}
                onClick={() => {
                  setPosition(RobotPosition.left);
                }}
                disabled={position == RobotPosition.left}
              >
                Left
              </button>
            </div>
            <div>
              <button
                id={'center'}
                onClick={() => {
                  setPosition(RobotPosition.center);
                }}
                disabled={position == RobotPosition.center}
              >
                Center
              </button>
            </div>
            <div>
              <button
                id={'right'}
                onClick={() => {
                  setPosition(RobotPosition.right);
                }}
                disabled={position == RobotPosition.right}
              >
                Right
              </button>
            </div>
          </section>
        </div>

        <label id={'start-button'}>
          <SetPhaseButton
            currentMode={match_config}
            desiredPhase={Phase.auto}
            disabled={false}
            label={'Start --->'}
            desiredGamestate={
              {
                ...gamestate,
                preloaded: isPreloaded,
                holdingCoral: isPreloaded,
              } as GS
            }
            callback={() =>
              autoConfig(scoutingSessionId, Phase.auto, preloaded, position)
            }
          />
        </label>
      </div>
    </div>
  );
}
export default MatchConfig;
