import { checklist } from '../modes/checklist.ts';
import { start_climb } from '../modes/start_climb.ts';

function FinishClimb() {
  return (
    <>
      <h1>Finished Climbing</h1>
      <button onClick={() => window.location.assign(checklist.url)}>
        Climbed
      </button>
      <button onClick={() => window.location.assign(start_climb.url)}>
        Stopped Climbing
      </button>
      <br />
      <button onClick={() => window.location.assign(checklist.url)}>
        Next ---&gt;
      </button>
      <br />
      <img
        src={'requirements/screens/finish-climb.jpeg'}
        width={'25%'}
        alt={'Finished Climbing'}
      />
    </>
  );
}
export default FinishClimb;
