import { human_feedback } from '../modes/human_feedback.ts';

function Checklist() {
  return (
    <>
      <h1>Did the robot...</h1>
      <button onClick={() => window.location.assign(human_feedback.url)}>
        Next ---&gt;
      </button>
      <br />
      <img
        src={'requirements/screens/checklist.jpeg'}
        width={'25%'}
        alt={'Did the robot...'}
      />
    </>
  );
}
export default Checklist;
