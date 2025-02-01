import { human_feedback } from '../modes/human_feedback.ts';
import { useNavigate } from 'react-router-dom';

function Checklist() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Did the robot...</h1>
      <button onClick={() => navigate(human_feedback.url)}>Next ---&gt;</button>
      <br />
      <img
        src={'/requirements/screens/checklist.jpeg'}
        width={'25%'}
        alt={'Did the robot...'}
      />
    </>
  );
}
export default Checklist;
