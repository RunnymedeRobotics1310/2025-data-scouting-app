import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReefScoreOptions from './sub/ReefScoreOptions.tsx';
import { holding_coral } from '../modes/holding_coral.ts';
import { AlgaeLocation, pickupAlgae } from '../functions/pickupAlgae.ts';
import { dropCoral } from '../functions/dropCoral.ts';
import RemoveAlgaeOptions from './sub/RemoveAlgaeOptions.tsx';
import { toggleDefence } from '../functions/toggleDefence.ts';
import { Phase, setPhase } from '../functions/setPhase.ts';

function HoldingCoral() {
  const [showReefOptions, setShowReefOptions] = useState(false);
  const [showAlgaeOptions, setShowAlgaeOptions] = useState(false);
  const navigate = useNavigate();
  //TODO: this should be global
  let auto = true;

  function clearSubOptions() {
    setShowAlgaeOptions(false);
    setShowReefOptions(false);
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
          <button onClick={() => setShowAlgaeOptions(true)}>
            Remove Algae
          </button>
        )}
      </>
    );
  }

  return (
    <>
      <h1>Holding Coral</h1>
      <button onClick={() => setShowReefOptions(true)}>Score Reef</button>
      <button onClick={() => navigate(dropCoral(holding_coral).url)}>
        Drop Coral
      </button>
      <button
        onClick={() =>
          navigate(pickupAlgae(holding_coral, AlgaeLocation.ground).url)
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
              navigate(pickupAlgae(holding_coral, AlgaeLocation.auto1).url)
            }
          >
            Auto Algae 1
          </button>
          <button
            onClick={() =>
              navigate(pickupAlgae(holding_coral, AlgaeLocation.auto2).url)
            }
          >
            Auto Algae 2
          </button>
          <button
            onClick={() =>
              navigate(pickupAlgae(holding_coral, AlgaeLocation.auto3).url)
            }
          >
            Auto Algae 3
          </button>
        </>
      )}
      <br />
      <button
        onClick={() => navigate(setPhase(holding_coral, Phase.endgame).url)}
      >
        Endgame ---&gt;
      </button>
      <br />
      {showReefOptions && <ReefScoreOptions mode={holding_coral} />}
      <img
        src={'/requirements/screens/holding-coral.jpeg'}
        width={'25%'}
        alt={'Holding Coral'}
      />
    </>
  );
}
export default HoldingCoral;
