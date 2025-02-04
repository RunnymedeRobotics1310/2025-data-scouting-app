import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CoralPickupOptions from './sub/CoralPickupOptions.tsx';
import { holding_algae } from '../modes/holding_algae.ts';
import { dropAlgae } from '../functions/dropAlgae.ts';
import AlgaeScoreOptions from './sub/AlgaeScoreOptions.tsx';
import { CoralLocation, pickupCoral } from '../functions/pickupCoral.ts';
import { toggleDefence } from '../functions/toggleDefence.ts';
import { Phase, setPhase } from '../functions/setPhase.ts';
import { removeAlgae } from '../functions/removeAlgae.ts';

function HoldingAlgae() {
  const [showPickupCoralOptions, setShowPickupCoralOptions] = useState(false);
  const [showScoreAlgaeOptions, setShowScoreAlgaeOptions] = useState(false);
  const navigate = useNavigate();
  //TODO: this should be global
  let auto = true;

  function showPickupCoralControls() {
    return (
      <>
        {showPickupCoralOptions ? (
          <CoralPickupOptions mode={holding_algae} />
        ) : (
          <button onClick={() => setShowPickupCoralOptions(true)}>
            Pickup Coral
          </button>
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
          <button onClick={() => setShowScoreAlgaeOptions(true)}>
            Score Algae
          </button>
        )}
      </>
    );
  }

  return (
    <>
      <h1>Holding Algae</h1>
      {scoreAlgaeOptions()}
      <button onClick={() => navigate(dropAlgae(holding_algae).url)}>
        Drop Algae
      </button>
      {showPickupCoralControls()}
      <button onClick={() => removeAlgae(holding_algae, false)}>
        Remove Algae
      </button>
      <button onClick={() => toggleDefence()}>Defence</button>
      {auto && (
        <>
          <br />
          <button
            onClick={() =>
              navigate(pickupCoral(holding_algae, CoralLocation.auto1).url)
            }
          >
            Auto Coral 1
          </button>
          <button
            onClick={() =>
              navigate(pickupCoral(holding_algae, CoralLocation.auto2).url)
            }
          >
            Auto Coral 2
          </button>
          <button
            onClick={() =>
              navigate(pickupCoral(holding_algae, CoralLocation.auto3).url)
            }
          >
            Auto Coral 3
          </button>
        </>
      )}
      <br />
      <button
        onClick={() => navigate(setPhase(holding_algae, Phase.endgame).url)}
      >
        Endgame ---&gt;
      </button>
      <br />
      <img
        src={'/requirements/screens/holding-algae.jpeg'}
        width={'25%'}
        alt={'Holding Algae'}
      />
    </>
  );
}
export default HoldingAlgae;
