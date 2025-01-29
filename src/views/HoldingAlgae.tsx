import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_both } from '../modes/holding_both.ts';
import { park } from '../modes/park.ts';

function HoldingAlgae() {
  return (
    <>
      <h1>Holding Algae</h1>
      <button onClick={() => window.location.assign(holding_nothing.url)}>
        Score Algae
      </button>
      <button onClick={() => window.location.assign(holding_nothing.url)}>
        Drop Algae
      </button>
      <button onClick={() => window.location.assign(holding_both.url)}>
        Pickup Coral
      </button>
      <br />
      <button onClick={() => window.location.assign(park.url)}>
        Endgame ---&gt;
      </button>
      <br />
      <img
        src={'requirements/screens/holding-algae.jpeg'}
        width={'25%'}
        alt={'Holding Algae'}
      />
    </>
  );
}
export default HoldingAlgae;
