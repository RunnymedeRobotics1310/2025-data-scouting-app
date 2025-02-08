import { useNavigate } from 'react-router-dom';
import { leaveStartingLine } from '../functions/leaveStartingLine.ts';
import { useContext } from 'react';
import CoralContext from '../context/CoralContext.tsx';

function LeaveStartLine() {
  const navigate = useNavigate();
  const { preloaded } = useContext(CoralContext);
  return (
    <button onClick={() => navigate(leaveStartingLine(preloaded).url)}>
      Leave Starting Line
    </button>
  );
}
export default LeaveStartLine;
