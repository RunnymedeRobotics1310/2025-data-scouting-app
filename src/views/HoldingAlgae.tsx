import { useContext, useState } from 'react';
import CoralPickupOptions from './sub/CoralPickupOptions.tsx';
import { holding_algae } from '../modes/holding_algae.ts';
import AlgaeScoreOptions from './sub/AlgaeScoreOptions.tsx';
import { SetPhaseButton } from '../functions/setPhase.tsx';
import PhaseContext from '../context/PhaseContext.tsx';
import { Phase } from '../common/phase.ts';
import RemoveAlgaeRemove from '../buttons/RemoveAlgaeRemove.tsx';
import PickupCoral from '../buttons/PickupCoral.tsx';
import AutoTeleopSwitch from '../buttons/AutoTeleopSwitch.tsx';
import Defence from '../buttons/Defence.tsx';
import ScoreAlgae from '../buttons/ScoreAlgae.tsx';
import DropAlgae from '../buttons/DropAlgae.tsx';
import PickupCoralAuto from '../buttons/PickupCoralAuto.tsx';
import FieldImage from '../common/FieldImage.tsx';
import FieldButton from '../common/FieldButton.tsx';

function HoldingAlgae() {
  const [showPickupCoralOptions, setShowPickupCoralOptions] = useState(false);
  const [showScoreAlgaeOptions, setShowScoreAlgaeOptions] = useState(false);
  const { currentPhase } = useContext(PhaseContext);

  function showPickupCoralControls() {
    return (
      <>
        {showPickupCoralOptions ? (
          <CoralPickupOptions mode={holding_algae} />
        ) : (
          <FieldButton x={175} y={400} w={48} h={16}>
            <PickupCoral callback={() => setShowPickupCoralOptions(true)} />
          </FieldButton>
        )}
      </>
    );
  }

  function scoreAlgaeOptions() {
    return (
      <>
        {showScoreAlgaeOptions ? (
          <AlgaeScoreOptions mode={holding_algae} />
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
      <h1>Holding Algae</h1>
      <FieldImage />
      {
        //
        // Auto & Teleop buttons
        //
      }
      <FieldButton x={175} y={0} w={32} h={16}>
        <AutoTeleopSwitch />
      </FieldButton>
      {scoreAlgaeOptions()}
      <FieldButton x={75} y={300} w={32} h={16}>
        <DropAlgae mode={holding_algae} />
      </FieldButton>
      {showPickupCoralControls()}
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
              currentMode={holding_algae}
              desiredPhase={Phase.endgame}
              label={'Endgame --->'}
            />
          </FieldButton>
        </>
      )}
      {
        //
        // Auto only buttons
        //
      }
      {currentPhase === Phase.auto && (
        <>
          <FieldButton x={125} y={400} w={16} h={16}>
            <PickupCoralAuto mode={holding_algae} />
          </FieldButton>
          <FieldButton x={175} y={400} w={16} h={16}>
            <PickupCoralAuto mode={holding_algae} />
          </FieldButton>
          <FieldButton x={225} y={400} w={16} h={16}>
            <PickupCoralAuto mode={holding_algae} />
          </FieldButton>
        </>
      )}
    </div>
  );
}
export default HoldingAlgae;
