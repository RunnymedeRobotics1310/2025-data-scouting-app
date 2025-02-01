import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { holding_nothing } from '../modes/holding_nothing.ts';
import RemoveAlgaeOptions from './sub/RemoveAlgaeOptions.tsx';
import { CoralLocation, pickupCoral } from '../functions/pickupCoral.ts';
import { AlgaeLocation, pickupAlgae } from '../functions/pickupAlgae.ts';
import CoralPickupOptions from './sub/CoralPickupOptions.tsx';
import { toggleDefence } from '../functions/toggleDefence.ts';
import { Phase, setPhase } from '../functions/setPhase.ts';

function HoldingNothing() {
  const [showPickupOptions, setShowPickupOptions] = useState(false);
  const [showAlgaeOptions, setShowAlgaeOptions] = useState(false);
  const navigate = useNavigate();
  //TODO: this should be global
  let auto = true;

  function clearSubOptions() {
    setShowAlgaeOptions(false);
    setShowPickupOptions(false);
  }

  function showRemoveAlgaeControls() {
    return (
      <>
        {showAlgaeOptions ? (
          <RemoveAlgaeOptions
            mode={holding_nothing}
            clearCallback={clearSubOptions}
          />
        ) : (
          <button onClick={() => setShowAlgaeOptions(true)}>
            Remove Algae
          </button>
        )}
      </>
    );
  }

  return (
    <>
      <h1>Holding Nothing</h1>
      <button onClick={() => setShowPickupOptions(true)}>Pickup Coral</button>
      <button
        onClick={() =>
          navigate(pickupAlgae(holding_nothing, AlgaeLocation.ground).url)
        }
      >
        Pickup Algae
      </button>
      {showRemoveAlgaeControls()}
      <button onClick={() => toggleDefence()}>Defence</button>

      {auto && (
        <>
          <br />
          <button
            onClick={() =>
              navigate(pickupCoral(holding_nothing, CoralLocation.auto1).url)
            }
          >
            Auto Coral 1
          </button>
          <button
            onClick={() =>
              navigate(pickupCoral(holding_nothing, CoralLocation.auto2).url)
            }
          >
            Auto Coral 2
          </button>
          <button
            onClick={() =>
              navigate(pickupCoral(holding_nothing, CoralLocation.auto3).url)
            }
          >
            Auto Coral 3
          </button>
          <br />
          <button
            onClick={() =>
              navigate(pickupAlgae(holding_nothing, AlgaeLocation.auto1).url)
            }
          >
            Auto Algae 1
          </button>
          <button
            onClick={() =>
              navigate(pickupAlgae(holding_nothing, AlgaeLocation.auto2).url)
            }
          >
            Auto Algae 2
          </button>
          <button
            onClick={() =>
              navigate(pickupAlgae(holding_nothing, AlgaeLocation.auto3).url)
            }
          >
            Auto Algae 3
          </button>
        </>
      )}
      <br />
      <button
        onClick={() => navigate(setPhase(holding_nothing, Phase.endgame).url)}
      >
        Endgame ---&gt;
      </button>
      <br />
      {showPickupOptions && <CoralPickupOptions mode={holding_nothing} />}

      <img
        src={'/requirements/screens/holding-nothing.jpeg'}
        width={'25%'}
        alt={'Holding Nothing'}
      />
    </>
  );
}

export default HoldingNothing;
