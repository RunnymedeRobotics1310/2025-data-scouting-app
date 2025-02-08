import { useContext, useState } from 'react';
import { holding_nothing } from '../modes/holding_nothing.ts';
import RemoveAlgaeOptions from './sub/RemoveAlgaeOptions.tsx';
import CoralPickupOptions from './sub/CoralPickupOptions.tsx';
import { SetPhaseButton } from '../functions/setPhase.tsx';
import PhaseContext from '../context/PhaseContext.tsx';
import { Phase } from '../common/phase.ts';
import RemoveAlgae from '../buttons/RemoveAlgae.tsx';
import PickupCoral from '../buttons/PickupCoral.tsx';
import AutoTeleopSwitch from '../buttons/AutoTeleopSwitch.tsx';
import PickupAlgae from '../buttons/PickupAlgae.tsx';
import Defence from '../buttons/Defence.tsx';
import PickupCoralAuto from '../buttons/PickupCoralAuto.tsx';
import PickupAlgaeAuto from '../buttons/PickupAlgaeAuto.tsx';
import FieldImage from '../common/FieldImage.tsx';
import FieldButton from '../common/FieldButton.tsx';

function HoldingNothing() {
  const [showPickupCoralOptions, setShowPickupCoralOptions] = useState(false);
  const [showAlgaeOptions, setShowAlgaeOptions] = useState(false);
  const { currentPhase } = useContext(PhaseContext);

  function clearSubOptions() {
    setShowAlgaeOptions(false);
    setShowPickupCoralOptions(false);
  }

  function showRemoveAlgaeControls() {
    return (
      <>
        {showAlgaeOptions ? (
          <RemoveAlgaeOptions
            mode={holding_nothing}
            clearCallback={() => clearSubOptions()}
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

  function showPickupCoralControls() {
    return (
      <>
        {showPickupCoralOptions ? (
          <CoralPickupOptions mode={holding_nothing} />
        ) : (
          <FieldButton x={175} y={400} w={48} h={16}>
            <PickupCoral callback={() => setShowPickupCoralOptions(true)} />
          </FieldButton>
        )}
      </>
    );
  }

  return (
    <div>
      <h1>Holding Nothing</h1>
      <FieldImage />
      {
        //
        // Auto & Teleop buttons
        //
      }
      <FieldButton x={175} y={0} w={32} h={16}>
        <AutoTeleopSwitch />
      </FieldButton>
      {showPickupCoralControls()}
      <FieldButton x={300} y={250} w={48} h={16}>
        <PickupAlgae mode={holding_nothing} />
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
              currentMode={holding_nothing}
              desiredPhase={Phase.endgame}
              label={'Endgame --->'}
              callback={null}
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
            <PickupCoralAuto mode={holding_nothing} />
          </FieldButton>
          <FieldButton x={175} y={400} w={16} h={16}>
            <PickupCoralAuto mode={holding_nothing} />
          </FieldButton>
          <FieldButton x={225} y={400} w={16} h={16}>
            <PickupCoralAuto mode={holding_nothing} />
          </FieldButton>

          <FieldButton x={125} y={425} w={16} h={16}>
            <PickupAlgaeAuto mode={holding_nothing} />
          </FieldButton>
          <FieldButton x={175} y={400} w={16} h={16}>
            <PickupAlgaeAuto mode={holding_nothing} />
          </FieldButton>
          <FieldButton x={225} y={400} w={16} h={16}>
            <PickupAlgaeAuto mode={holding_nothing} />
          </FieldButton>
        </>
      )}
    </div>
  );
}

export default HoldingNothing;
