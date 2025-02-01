import { finish_climb } from '../modes/finish_climb.ts';
import { park } from '../modes/park.ts';
import { checklist } from '../modes/checklist.ts';
import { useNavigate } from 'react-router-dom';

function StartClimb() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Start Climbing</h1>
      <button onClick={() => navigate(finish_climb.url)}>Shallow Climb</button>
      <button onClick={() => navigate(finish_climb.url)}>Deep Climb</button>
      <button onClick={() => navigate(park.url)}>Left Barge Zone</button>
      <br />
      <button onClick={() => navigate(checklist.url)}>Next ---&gt;</button>
      <br />
      <img
        src={'/requirements/screens/start-climb.jpeg'}
        width={'25%'}
        alt={'Start Climbing'}
      />
    </>
  );
}
export default StartClimb;
