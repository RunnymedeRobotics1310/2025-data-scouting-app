import { useContext, useState } from 'react';
import ReefScoreOptions from './sub/ReefScoreOptions.tsx';
import { holding_coral } from '../modes/holding_coral.ts';
import RemoveAlgaeOptions from './sub/RemoveAlgaeOptions.tsx';
import PhaseContext from '../context/PhaseContext.tsx';
import { Phase } from '../common/phase.ts';
import RemoveAlgae from '../buttons/RemoveAlgae.tsx';
import PickupAlgae from '../buttons/PickupAlgae.tsx';
import Defence from '../buttons/Defence.tsx';
import ScoreReef from '../buttons/ScoreReef.tsx';
import DropCoral from '../buttons/DropCoral.tsx';
import PickupAlgaeAuto from '../buttons/PickupAlgaeAuto.tsx';
import Zone from '../common/Zone.tsx';
import Field from '../common/Field.tsx';
import { AlgaeLocation } from '../functions/pickupAlgae.ts';

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
          <Zone zone="behind-reef" classes={'bottom'}>
            <ScoreReef callback={() => setShowReefOptions(true)} />
          </Zone>
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
          <Zone zone="reef-right">
            <RemoveAlgae
              callback={() => {
                setShowAlgaeOptions(true);
              }}
            />
          </Zone>
        )}
      </>
    );
  }

  return (
    <Field>
      <Zone zone={'driver-station'}>
        <h1>Holding Coral</h1>
      </Zone>
      {
        //
        // Auto & Teleop buttons
        //
      }
      {showScoreReefControls()}
      <Zone zone="driver-station">
        <DropCoral mode={holding_coral} />
      </Zone>
      <Zone zone="reef-front-right" classes={'top left'}>
        <PickupAlgae mode={holding_coral} />
      </Zone>
      {showRemoveAlgaeControls()}
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
      {
        //
        // Auto only buttons
        //
      }
      {currentPhase === Phase.auto && (
        <>
          <Zone zone="driver-station" classes={'top'}>
            <PickupAlgaeAuto
              mode={holding_coral}
              location={AlgaeLocation.autoCenter}
            />
          </Zone>
          <Zone zone="left-station" classes={'top right'}>
            <PickupAlgaeAuto
              mode={holding_coral}
              location={AlgaeLocation.autoLeft}
            />
          </Zone>
          <Zone zone="right-station" classes={'top left'}>
            <PickupAlgaeAuto
              mode={holding_coral}
              location={AlgaeLocation.autoRight}
            />
          </Zone>
        </>
      )}
    </Field>
  );
}
export default HoldingCoral;
