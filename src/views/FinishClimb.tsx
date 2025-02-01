import { checklist } from '../modes/checklist.ts';
import { start_climb } from '../modes/start_climb.ts';
import { useNavigate } from 'react-router-dom';

function FinishClimb() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Finished Climbing</h1>
      <button onClick={() => navigate(checklist.url)}>Climbed</button>
      <button onClick={() => navigate(start_climb.url)}>
        Stopped Climbing
      </button>
      <br />
      <button onClick={() => navigate(checklist.url)}>Next ---&gt;</button>
      <br />
      <img
        src={'/requirements/screens/finish-climb.jpeg'}
        width={'25%'}
        alt={'Finished Climbing'}
      />
    </>
  );
}
export default FinishClimb;
