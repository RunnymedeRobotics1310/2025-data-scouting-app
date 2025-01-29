import { holding_coral } from '../modes/holding_coral.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { park } from '../modes/park.ts';

function HoldingNothing() {
  return (
    <>
      <h1>Holding Nothing</h1>
      <button onClick={() => window.location.assign(holding_coral.url)}>
        Pickup Coral
      </button>
      <button onClick={() => window.location.assign(holding_algae.url)}>
        Pickup Algae
      </button>
      <br />
      <button onClick={() => window.location.assign(park.url)}>
        Endgame ---&gt;
      </button>
      <br />
      <img
        src={'requirements/screens/holding-nothing.jpeg'}
        width={'25%'}
        alt={'Holding Nothing'}
      />
    </>
  );
}
export default HoldingNothing;
