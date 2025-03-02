import { useContext, useState } from 'react';
import { holding_nothing } from '../modes/holding_nothing.ts';
import RemoveAlgaeOptions from './sub/RemoveAlgaeOptions.tsx';
import CoralPickupOptions from './sub/CoralPickupOptions.tsx';
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
import GameContext from '../context/GameContext.tsx';

function HoldingNothing() {
  const [showPickupCoralOptions, setShowPickupCoralOptions] = useState(false);
  const [showAlgaeOptions, setShowAlgaeOptions] = useState(false);
  const { gamestate } = useContext(GameContext);
  const {
    currentPhase,
    pickedAutoCoralLeft,
    pickedAutoCoralCenter,
    pickedAutoCoralRight,
    pickedAutoAlgaeLeft,
    pickedAutoAlgaeCenter,
    pickedAutoAlgaeRight,
  } = gamestate;

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
      {
        //
        // Auto & Teleop buttons
        //
      }
      {showPickupCoralControls()}
      {showRemoveAlgaeControls()}
      {
        //
        // Teleop only buttons
        //
      }
      {currentPhase === Phase.teleop && (
        <>
          <Zone zone="reef-front-right">
            <PickupAlgae mode={holding_nothing} />
          </Zone>
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
          {!pickedAutoCoralCenter && (
            <Zone zone="reef-front" classes={'bottom'}>
              <PickupCoralAuto
                mode={holding_nothing}
                location={CoralLocation.autoCenter}
              />
            </Zone>
          )}
          {!pickedAutoCoralLeft && (
            <Zone zone="reef-front-left" classes={'bottom right'}>
              <PickupCoralAuto
                mode={holding_nothing}
                location={CoralLocation.autoLeft}
              />
            </Zone>
          )}
          {!pickedAutoCoralRight && (
            <Zone zone="reef-front-right" classes={'bottom left'}>
              <PickupCoralAuto
                mode={holding_nothing}
                location={CoralLocation.autoRight}
              />
            </Zone>
          )}
          {!pickedAutoAlgaeCenter && (
            <Zone zone="driver-station" classes={'top'}>
              <PickupAlgaeAuto
                mode={holding_nothing}
                location={AlgaeLocation.autoCenter}
              />
            </Zone>
          )}
          {!pickedAutoAlgaeLeft && (
            <Zone zone="left-station" classes={'top right'}>
              <PickupAlgaeAuto
                mode={holding_nothing}
                location={AlgaeLocation.autoLeft}
              />
            </Zone>
          )}
          {!pickedAutoAlgaeRight && (
            <Zone zone="right-station" classes={'top left'}>
              <PickupAlgaeAuto
                mode={holding_nothing}
                location={AlgaeLocation.autoRight}
              />
            </Zone>
          )}
        </>
      )}
    </Field>
  );
}

export default HoldingNothing;
