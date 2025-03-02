import { useContext, useState } from 'react';
import { holding_both } from '../modes/holding_both.ts';
import ReefScoreOptions from './sub/ReefScoreOptions.tsx';
import AlgaeScoreOptions from './sub/AlgaeScoreOptions.tsx';
import { Phase } from '../common/phase.ts';
import RemoveAlgaeRemove from '../buttons/RemoveAlgaeRemove.tsx';
import Defence from '../buttons/Defence.tsx';
import ScoreAlgae from '../buttons/ScoreAlgae.tsx';
import DropCoral from '../buttons/DropCoral.tsx';
import DropAlgae from '../buttons/DropAlgae.tsx';
import Zone from '../common/Zone.tsx';
import ScoreReef from '../buttons/ScoreReef.tsx';
import Field from '../common/Field.tsx';
import GameContext from '../context/GameContext.tsx';

function HoldingBoth() {
  const [showReefOptions, setShowReefOptions] = useState(false);
  const [showScoreAlgaeOptions, setShowScoreAlgaeOptions] = useState(false);
  const { gamestate } = useContext(GameContext);
  const { currentPhase } = gamestate;

  function showScoreReefControls() {
    return (
      <>
        {showReefOptions ? (
          <ReefScoreOptions mode={holding_both} />
        ) : (
          <Zone zone="behind-reef" classes={'bottom'}>
            <ScoreReef callback={() => setShowReefOptions(true)} />
          </Zone>
        )}
      </>
    );
  }

  function scoreAlgaeOptions() {
    return (
      <>
        {showScoreAlgaeOptions ? (
          <AlgaeScoreOptions mode={holding_both} />
        ) : (
          <Zone zone="start-zone">
            <ScoreAlgae callback={() => setShowScoreAlgaeOptions(true)} />
          </Zone>
        )}
      </>
    );
  }

  return (
    <Field>
      {
        //
        // Auto & Teleop buttons
        //
      }
      {showScoreReefControls()} {scoreAlgaeOptions()}
      <Zone zone="driver-station">
        <DropCoral mode={holding_both} />
      </Zone>
      <Zone zone="reef-front-right">
        <DropAlgae mode={holding_both} />
      </Zone>
      <Zone zone="reef-right">
        <RemoveAlgaeRemove mode={holding_both} />
      </Zone>
      {
        //
        // Teleop only buttons
        //
      }
      {currentPhase === Phase.teleop && (
        <>
          <Zone zone="start-zone" classes={'top left'}>
            <Defence />
          </Zone>
        </>
      )}
    </Field>
  );
}
export default HoldingBoth;
