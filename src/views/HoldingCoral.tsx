import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_both } from '../modes/holding_both.ts';
import { park } from '../modes/park.ts';

function HoldingCoral() {
  return (
    <>
      <h1>Holding Coral</h1>
      <button onClick={() => window.location.assign(holding_nothing.url)}>
        Score Reef
      </button>
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
      <img
        src={'requirements/screens/holding-coral.jpeg'}
        width={'25%'}
        alt={'Holding Coral'}
      />
    </>
  );
}
export default HoldingCoral;
