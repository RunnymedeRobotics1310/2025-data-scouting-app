import { holding_algae } from '../modes/holding_algae.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { park } from '../modes/park.ts';

function HoldingBoth() {
  return (
    <>
      <h1>Holding Both</h1>
      <button onClick={() => window.location.assign(holding_algae.url)}>
        Score Reef
      </button>
      <button onClick={() => window.location.assign(holding_coral.url)}>
        Score Algae
      </button>
      <button onClick={() => window.location.assign(holding_algae.url)}>
        Drop Coral
      </button>
      <button onClick={() => window.location.assign(holding_coral.url)}>
        Drop Algae
      </button>
      <br />
      <button onClick={() => window.location.assign(park.url)}>
        Endgame ---&gt;
      </button>
      <br />
      <img
        src={'requirements/screens/holding-both.jpeg'}
        width={'25%'}
        alt={'Holding Both'}
      />
    </>
  );
}
export default HoldingBoth;
