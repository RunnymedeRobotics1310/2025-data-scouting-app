import { useContext, useState } from 'react';
import { holding_nothing } from '../modes/holding_nothing.ts';
import RemoveAlgaeOptions from './sub/RemoveAlgaeOptions.tsx';
import CoralPickupOptions from './sub/CoralPickupOptions.tsx';
import PhaseContext from '../context/PhaseContext.tsx';
import { Phase } from '../common/phase.ts';
import RemoveAlgae from '../buttons/RemoveAlgae.tsx';
import PickupCoral from '../buttons/PickupCoral.tsx';
import PickupAlgae from '../buttons/PickupAlgae.tsx';
import Defence from '../buttons/Defence.tsx';
import PickupCoralAuto from '../buttons/PickupCoralAuto.tsx';
import PickupAlgaeAuto from '../buttons/PickupAlgaeAuto.tsx';
import Zone from '../common/Zone.tsx';
import Field from '../common/Field.tsx';
import { CoralLocation } from '../functions/pickupCoral.ts';
import { AlgaeLocation } from '../functions/pickupAlgae.ts';

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

  function showPickupCoralControls() {
    return (
      <>
        {showPickupCoralOptions ? (
          <CoralPickupOptions mode={holding_nothing} />
        ) : (
          <Zone zone="driver-station">
            <PickupCoral callback={() => setShowPickupCoralOptions(true)} />
          </Zone>
        )}
      </>
    );
  }

  return (
    <Field>
      {/*<Zone zone={'barge-left'} classes={'red'}>*/}
      {/*  Barge left*/}
      {/*</Zone>*/}
      {/*/!*<div className={'barge'}>barge</div>*!/*/}
      {/*/!*<div className={'barge-right'}>barge right</div>*!/*/}
      {/*/!*<div className={'start-zone'}>start zone</div>*!/*/}
      {/*/!*<div className={'behind-reef'}>behind reef</div>*!/*/}
      {/*/!*<div className={'reef-left'}>reef left</div>*!/*/}
      {/*<div className={'reef'}>reef</div>*/}
      {/*<div className={'reef-right'}>reef right</div>*/}
      {/*<div className={'reef-front-left'}>reef front left</div>*/}
      {/*<div className={'reef-front'}>reef front</div>*/}
      {/*<div className={'reef-front-right'}>reef front right</div>*/}
      {/*<div className={'left-station'}>left station</div>*/}
      {/*<div className={'driver-station'}>driver station</div>*/}
      {/*<div className={'right-station'}>right station</div>*/}

      <Zone zone={'driver-station'} classes={'top'}>
        <h1>
          Holding Nothing--------------------------------------
          ----------------------------------------------------------------------a
        </h1>
      </Zone>
      {
        //
        // Auto & Teleop buttons
        //
      }
      {showPickupCoralControls()}
      <Zone zone="reef-front-right">
        <PickupAlgae mode={holding_nothing} />
      </Zone>
      {showRemoveAlgaeControls()}
      {
        //
        // Teleop only buttons
        //
      }
      {currentPhase === Phase.teleop && (
        <>
          <Zone zone="start-zone" classes={'left'}>
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
          <Zone zone="reef-front" classes={'bottom'}>
            <PickupCoralAuto
              mode={holding_nothing}
              location={CoralLocation.autoCenter}
            />
          </Zone>
          <Zone zone="reef-front-left" classes={'bottom right'}>
            <PickupCoralAuto
              mode={holding_nothing}
              location={CoralLocation.autoLeft}
            />
          </Zone>
          <Zone zone="reef-front-right" classes={'bottom left'}>
            <PickupCoralAuto
              mode={holding_nothing}
              location={CoralLocation.autoRight}
            />
          </Zone>

          <Zone zone="driver-station" classes={'top'}>
            <PickupAlgaeAuto
              mode={holding_nothing}
              location={AlgaeLocation.autoCenter}
            />
          </Zone>
          <Zone zone="left-station" classes={'top right'}>
            <PickupAlgaeAuto
              mode={holding_nothing}
              location={AlgaeLocation.autoLeft}
            />
          </Zone>
          <Zone zone="right-station" classes={'top left'}>
            <PickupAlgaeAuto
              mode={holding_nothing}
              location={AlgaeLocation.autoRight}
            />
          </Zone>
        </>
      )}
    </Field>
  );
}

export default HoldingNothing;
