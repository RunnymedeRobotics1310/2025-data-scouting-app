import { match_select } from '../modes/match_select.ts';

function HumanFeedback() {
  return (
    <>
      <h1>Human Feedback</h1>
      <button onClick={() => window.location.assign(match_select.url)}>
        Done ---&gt;
      </button>
      <br />
      <img
        src={'requirements/screens/human-feedback.jpeg'}
        width={'25%'}
        alt={'Human Feedback'}
      />
    </>
  );
}
export default HumanFeedback;
