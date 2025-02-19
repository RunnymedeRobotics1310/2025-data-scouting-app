import { useNavigate } from 'react-router-dom';
import { leaveStartingLine } from '../functions/leaveStartingLine.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';

function LeaveStartLine() {
  const navigate = useNavigate();
  const { gamestate, setGamestate } = useContext(GameContext);
  const { preloaded } = gamestate;
  return (
    <button
      onClick={() => {
        navigate(leaveStartingLine(preloaded).url);
        setGamestate({ ...gamestate, left: true });
      }}
    >
      Leave Starting Line
    </button>
  );
}
export default LeaveStartLine;
