import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_coral } from '../modes/holding_coral.ts';

function StartLine() {
  return (
    <>
      <h1>Start Line</h1>
      <button onClick={() => window.location.assign(holding_nothing.url)}>
        Leave Starting Line (no coral)
      </button>
      <button onClick={() => window.location.assign(holding_coral.url)}>
        Leave Starting Line (yes coral)
      </button>
      <br />
      <img
        src={'/requirements/screens/start-line.jpeg'}
        width={'25%'}
        alt={'Start Line'}
      />
    </>
  );
}
export default StartLine;
