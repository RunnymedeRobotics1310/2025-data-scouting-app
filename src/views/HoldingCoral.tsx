import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_both } from '../modes/holding_both.ts';
import { park } from '../modes/park.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReefScoreOptions from './sub/ReefScoreOptions.tsx';
import { holding_coral } from '../modes/holding_coral.ts';

function HoldingCoral() {
  const [showReefOptions, setShowReefOptions] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <h1>Holding Coral</h1>
      <button onClick={() => setShowReefOptions(true)}>Score Reef</button>
      <button onClick={() => navigate(holding_nothing.url)}>Drop Coral</button>
      <button onClick={() => navigate(holding_both.url)}>Pickup Algae</button>
      <br />
      <button onClick={() => navigate(park.url)}>Endgame ---&gt;</button>
      <br />
      {showReefOptions && <ReefScoreOptions mode={holding_coral} />}
      <img
        src={'requirements/screens/holding-coral.jpeg'}
        width={'25%'}
        alt={'Holding Coral'}
      />
    </>
  );
}
export default HoldingCoral;
