import { useNavigate } from 'react-router-dom';
import { leaveStartingLine } from '../functions/leaveStartingLine.ts';

function StartLine() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Start Line</h1>
      <button onClick={() => navigate(leaveStartingLine().url)}>
        Leave Starting Line
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
