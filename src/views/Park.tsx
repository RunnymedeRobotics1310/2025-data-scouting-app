import { start_climb } from '../modes/start_climb.ts';
import { checklist } from '../modes/checklist.ts';

function Park() {
  return (
    <>
      <h1>Park</h1>
      <button onClick={() => window.location.assign(start_climb.url)}>
        Park
      </button>
      <br />
      <button onClick={() => window.location.assign(checklist.url)}>
        Next ---&gt;
      </button>
      <br />
      <img src={'requirements/screens/park.jpeg'} width={'25%'} alt={'Park'} />
    </>
  );
}
export default Park;
