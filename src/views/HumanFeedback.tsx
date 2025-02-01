import { match_select } from '../modes/match_select.ts';
import { useNavigate } from 'react-router-dom';

function HumanFeedback() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Human Feedback</h1>
      <button onClick={() => navigate(match_select.url)}>Done ---&gt;</button>
      <br />
      <img
        src={'/requirements/screens/human-feedback.jpeg'}
        width={'25%'}
        alt={'Human Feedback'}
      />
    </>
  );
}
export default HumanFeedback;
