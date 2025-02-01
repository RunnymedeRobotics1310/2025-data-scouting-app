import { start_climb } from '../modes/start_climb.ts';
import { checklist } from '../modes/checklist.ts';
import { useNavigate } from 'react-router-dom';

function Park() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Park</h1>
      <button onClick={() => navigate(start_climb.url)}>Park</button>
      <br />
      <button onClick={() => navigate(checklist.url)}>Next ---&gt;</button>
      <br />
      <img src={'/requirements/screens/park.jpeg'} width={'25%'} alt={'Park'} />
    </>
  );
}
export default Park;
