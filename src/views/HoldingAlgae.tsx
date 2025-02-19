import { useContext, useState } from 'react';
import CoralPickupOptions from './sub/CoralPickupOptions.tsx';
import { holding_algae } from '../modes/holding_algae.ts';
import AlgaeScoreOptions from './sub/AlgaeScoreOptions.tsx';
import { Phase } from '../common/phase.ts';
import RemoveAlgaeRemove from '../buttons/RemoveAlgaeRemove.tsx';
import PickupCoral from '../buttons/PickupCoral.tsx';
import Defence from '../buttons/Defence.tsx';
import ScoreAlgae from '../buttons/ScoreAlgae.tsx';
import DropAlgae from '../buttons/DropAlgae.tsx';
import PickupCoralAuto from '../buttons/PickupCoralAuto.tsx';
import Zone from '../common/Zone.tsx';
import Field from '../common/Field.tsx';
import { CoralLocation } from '../functions/pickupCoral.ts';
import GameContext from '../context/GameContext.tsx';

function HoldingAlgae() {
  const [showPickupCoralOptions, setShowPickupCoralOptions] = useState(false);
  const [showScoreAlgaeOptions, setShowScoreAlgaeOptions] = useState(false);
  const { gamestate } = useContext(GameContext);
  const {
    currentPhase,
    pickedAutoAlgaeLeft,
    pickedAutoAlgaeCenter,
    pickedAutoAlgaeRight,
  } = gamestate;
  function showPickupCoralControls() {
    return (
      <>
        {showPickupCoralOptions ? (
          <CoralPickupOptions mode={holding_algae} />
        ) : (
          <Zone zone="driver-station">
            <PickupCoral callback={() => setShowPickupCoralOptions(true)} />
          </Zone>
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
          <Zone zone="start-zone">
            <ScoreAlgae callback={() => setShowScoreAlgaeOptions(true)} />
          </Zone>
        )}
      </>
    );
  }

  return (
    <Field>
      <Zone zone={'driver-station'}>
        <h1>Holding Algae</h1>
      </Zone>
      {
        //
        // Auto & Teleop buttons
        //
      }
      {scoreAlgaeOptions()}
      <Zone zone="reef-front-right">
        <DropAlgae mode={holding_algae} />
      </Zone>
      {showPickupCoralControls()}
      <Zone zone="reef-right">
        <RemoveAlgaeRemove mode={holding_algae} />
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
      {
        //
        // Auto only buttons
        //
      }
      {currentPhase === Phase.auto && (
        <>
          {!pickedAutoAlgaeCenter && (
            <Zone zone="reef-front" classes={'bottom'}>
              <PickupCoralAuto
                mode={holding_algae}
                location={CoralLocation.autoCenter}
              />
            </Zone>
          )}
          {!pickedAutoAlgaeLeft && (
            <Zone zone="reef-front-left" classes={'bottom right'}>
              <PickupCoralAuto
                mode={holding_algae}
                location={CoralLocation.autoLeft}
              />
            </Zone>
          )}
          {!pickedAutoAlgaeRight && (
            <Zone zone="reef-front-right" classes={'bottom left'}>
              <PickupCoralAuto
                mode={holding_algae}
                location={CoralLocation.autoRight}
              />
            </Zone>
          )}
        </>
      )}
    </Field>
  );
}
export default HoldingAlgae;
