import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_both } from '../modes/holding_both.ts';
import { park } from '../modes/park.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HoldingCoral() {
  const [showReefOptions, setShowReefOptions] = useState(false);
  const navigate = useNavigate();

  function scoreReef(level: number) {
    console.log('Scored reef level ' + level);
    navigate(holding_nothing.url);
  }
  function missCoral() {
    console.log('Missed coral');
    navigate(holding_nothing.url);
  }

  return (
    <>
      <h1>Holding Coral</h1>
      <button onClick={() => setShowReefOptions(true)}>Score Reef</button>
      <button onClick={() => window.location.assign(holding_nothing.url)}>
        Drop Coral
      </button>
      <button onClick={() => window.location.assign(holding_both.url)}>
        Pickup Algae
      </button>
      <br />
      <button onClick={() => window.location.assign(park.url)}>
        Endgame ---&gt;
      </button>
      <br />
      {showReefOptions && (
        <div>
          <button onClick={() => missCoral()}>Oopsie</button>
          <button onClick={() => scoreReef(1)}>1</button>
          <button onClick={() => scoreReef(2)}>2</button>
          <button onClick={() => scoreReef(3)}>3</button>
          <button onClick={() => scoreReef(4)}>4</button>
        </div>
      )}
      <img
        src={'requirements/screens/holding-coral.jpeg'}
        width={'25%'}
        alt={'Holding Coral'}
      />
    </>
  );
}
export default HoldingCoral;
