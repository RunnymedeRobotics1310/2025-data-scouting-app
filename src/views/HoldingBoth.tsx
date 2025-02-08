import { useContext, useState } from 'react';
import { holding_both } from '../modes/holding_both.ts';
import ReefScoreOptions from './sub/ReefScoreOptions.tsx';
import AlgaeScoreOptions from './sub/AlgaeScoreOptions.tsx';
import { SetPhaseButton } from '../functions/setPhase.tsx';
import { Phase } from '../common/phase.ts';
import RemoveAlgaeRemove from '../buttons/RemoveAlgaeRemove.tsx';
import AutoTeleopSwitch from '../buttons/AutoTeleopSwitch.tsx';
import Defence from '../buttons/Defence.tsx';
import ScoreAlgae from '../buttons/ScoreAlgae.tsx';
import DropCoral from '../buttons/DropCoral.tsx';
import DropAlgae from '../buttons/DropAlgae.tsx';
import FieldImage from '../common/FieldImage.tsx';
import FieldButton from '../common/FieldButton.tsx';
import ScoreReef from '../buttons/ScoreReef.tsx';
import PhaseContext from '../context/PhaseContext.tsx';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_algae } from '../modes/holding_algae.ts';

function HoldingBoth() {
  const [showReefOptions, setShowReefOptions] = useState(false);
  const [showScoreAlgaeOptions, setShowScoreAlgaeOptions] = useState(false);
  const { currentPhase } = useContext(PhaseContext);

  function showScoreReefControls() {
    return (
      <>
        {showReefOptions ? (
          <ReefScoreOptions mode={holding_both} />
        ) : (
          <FieldButton x={175} y={250} w={64} h={16}>
            <ScoreReef callback={() => setShowReefOptions(true)} />
          </FieldButton>
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
          <FieldButton x={175} y={50} w={48} h={16}>
            <ScoreAlgae callback={() => setShowScoreAlgaeOptions(true)} />
          </FieldButton>
        )}
      </>
    );
  }

  return (
    <div>
      <h1>Holding Both</h1>
      <FieldImage />
      {
        //
        // Auto & Teleop buttons
        //
      }
      <FieldButton x={175} y={0} w={32} h={16}>
        <AutoTeleopSwitch />
      </FieldButton>
      {showScoreReefControls()} {scoreAlgaeOptions()}
      <FieldButton x={75} y={275} w={32} h={16}>
        <DropCoral mode={holding_coral} />
      </FieldButton>
      <FieldButton x={75} y={300} w={32} h={16}>
        <DropAlgae mode={holding_algae} />
      </FieldButton>
      <FieldButton x={325} y={275} w={24} h={16}>
        <RemoveAlgaeRemove mode={holding_algae} />
      </FieldButton>
      {
        //
        // Teleop only buttons
        //
      }
      {currentPhase === Phase.teleop && (
        <>
          <FieldButton x={32} y={32} w={32} h={16}>
            <Defence />
          </FieldButton>
          <FieldButton x={325} y={450} w={64} h={16}>
            <SetPhaseButton
              currentMode={holding_both}
              desiredPhase={Phase.endgame}
              label={'Endgame --->'}
            />
          </FieldButton>
        </>
      )}
    </div>
  );
}
export default HoldingBoth;
