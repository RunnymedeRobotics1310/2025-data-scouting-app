import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { dropCoral } from '../functions/dropCoral.ts';
import { holding_both } from '../modes/holding_both.ts';
import { dropAlgae } from '../functions/dropAlgae.ts';
import ReefScoreOptions from './sub/ReefScoreOptions.tsx';
import AlgaeScoreOptions from './sub/AlgaeScoreOptions.tsx';
import { toggleDefence } from '../functions/toggleDefence.ts';
import { Phase, setPhase } from '../functions/setPhase.ts';
import { removeAlgae } from '../functions/removeAlgae.ts';

function HoldingBoth() {
  const navigate = useNavigate();
  const [showReefOptions, setShowReefOptions] = useState(false);
  const [showScoreAlgaeOptions, setShowScoreAlgaeOptions] = useState(false);

  function showScoreReefControls() {
    return (
      <>
        {showReefOptions ? (
          <ReefScoreOptions mode={holding_both} />
        ) : (
          <button onClick={() => setShowReefOptions(true)}>Score Reef</button>
        )}
      </>
    );
  }

  function scoreAlgaeOptions() {
    return (
      <>
        {showScoreAlgaeOptions ? (
          <AlgaeScoreOptions mode={holding_both} />
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
      <h1>Holding Both</h1>
      {showScoreReefControls()} {scoreAlgaeOptions()}
      <button onClick={() => navigate(dropCoral(holding_both).url)}>
        Drop Coral
      </button>
      <button onClick={() => navigate(dropAlgae(holding_both).url)}>
        Drop Algae
      </button>
      <button onClick={() => removeAlgae(holding_both, false)}>
        Remove Algae
      </button>
      <button onClick={() => toggleDefence()}>Defence</button>
      <br />
      <button
        onClick={() => navigate(setPhase(holding_both, Phase.endgame).url)}
      >
        Endgame ---&gt;
      </button>
      <br />
      <img
        src={'/requirements/screens/holding-both.jpeg'}
        width={'25%'}
        alt={'Holding Both'}
      />
    </>
  );
}
export default HoldingBoth;
