import { autoConfig, RobotPosition } from '../functions/autoConfig.ts';
import { useContext, useState } from 'react';
import { SetPhaseButton } from '../functions/setPhase.tsx';
import { match_config } from '../modes/match_config.ts';
import { Phase } from '../common/phase.ts';
import GameContext from '../context/GameContext.tsx';

function MatchConfig() {
  // const [preloaded, setPreloaded] = useState(false);
  const [position, setPosition] = useState(RobotPosition.left);
  const { gamestate, saveGamestate } = useContext(GameContext);
  const { preloaded, isRed, teamNumber } = gamestate;
  return (
    <div className={'general-layout'}>
      <div className={'match-config'}>
        <label id={'external-team-number'}>
          <span className={isRed ? 'team allianceRed' : 'team allianceBlue'}>
            Team {teamNumber}
          </span>
        </label>

        <label className={'checkbox-and-label'}>
          <input
            type={'checkbox'}
            checked={preloaded}
            id={'preloaded'}
            onChange={() => {
              saveGamestate({
                ...gamestate,
                preloaded: !preloaded,
                holdingCoral: preloaded,
              });
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
            label={'Start --->'}
            callback={() => autoConfig(preloaded, position)}
          />
        </label>
        {/*<img*/}
        {/*  src={'/requirements/screens/match-config.jpeg'}*/}
        {/*  width={'25%'}*/}
        {/*  alt={'Match Config'}*/}
        {/*/>*/}
      </div>
    </div>
  );
}
export default MatchConfig;
