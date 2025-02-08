import { useContext, useState } from 'react';
import ReefScoreOptions from './sub/ReefScoreOptions.tsx';
import { holding_coral } from '../modes/holding_coral.ts';
import RemoveAlgaeOptions from './sub/RemoveAlgaeOptions.tsx';
import { SetPhaseButton } from '../functions/setPhase.tsx';
import PhaseContext from '../context/PhaseContext.tsx';
import { Phase } from '../common/phase.ts';
import RemoveAlgae from '../buttons/RemoveAlgae.tsx';
import AutoTeleopSwitch from '../buttons/AutoTeleopSwitch.tsx';
import PickupAlgae from '../buttons/PickupAlgae.tsx';
import Defence from '../buttons/Defence.tsx';
import ScoreReef from '../buttons/ScoreReef.tsx';
import DropCoral from '../buttons/DropCoral.tsx';
import PickupAlgaeAuto from '../buttons/PickupAlgaeAuto.tsx';
import FieldImage from '../common/FieldImage.tsx';
import FieldButton from '../common/FieldButton.tsx';

function HoldingCoral() {
  const [showReefOptions, setShowReefOptions] = useState(false);
  const [showAlgaeOptions, setShowAlgaeOptions] = useState(false);
  const { currentPhase } = useContext(PhaseContext);

  function clearSubOptions() {
    setShowAlgaeOptions(false);
    setShowReefOptions(false);
  }

  function showScoreReefControls() {
    return (
      <>
        {showReefOptions ? (
          <ReefScoreOptions mode={holding_coral} />
        ) : (
          <FieldButton x={175} y={250} w={64} h={16}>
            <ScoreReef callback={() => setShowReefOptions(true)} />
          </FieldButton>
        )}
      </>
    );
  }

  function showRemoveAlgaeControls() {
    return (
      <>
        {showAlgaeOptions ? (
          <RemoveAlgaeOptions
            mode={holding_coral}
            clearCallback={clearSubOptions}
          />
        ) : (
          <FieldButton x={300} y={100} w={48} h={16}>
            <RemoveAlgae
              callback={() => {
                setShowAlgaeOptions(true);
              }}
            />
          </FieldButton>
        )}
      </>
    );
  }

  return (
    <div>
      <h1>Holding Coral</h1>
      <FieldImage />
      {
        //
        // Auto & Teleop buttons
        //
      }
      <FieldButton x={175} y={0} w={32} h={16}>
        <AutoTeleopSwitch />
      </FieldButton>
      {showScoreReefControls()}
      <FieldButton x={75} y={275} w={32} h={16}>
        <DropCoral mode={holding_coral} />
      </FieldButton>
      <FieldButton x={300} y={250} w={48} h={16}>
        <PickupAlgae mode={holding_coral} />
      </FieldButton>
      {showRemoveAlgaeControls()}
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
              currentMode={holding_coral}
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
          <FieldButton x={125} y={425} w={16} h={16}>
            <PickupAlgaeAuto mode={holding_coral} />
          </FieldButton>
          <FieldButton x={175} y={400} w={16} h={16}>
            <PickupAlgaeAuto mode={holding_coral} />
          </FieldButton>
          <FieldButton x={225} y={400} w={16} h={16}>
            <PickupAlgaeAuto mode={holding_coral} />
          </FieldButton>
        </>
      )}
    </div>
  );
}
export default HoldingCoral;
