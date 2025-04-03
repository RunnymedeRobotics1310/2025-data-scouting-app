import { useNavigate } from 'react-router-dom';
import { leaveStartingLine } from '../functions/leaveStartingLine.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';
import { getScoutingSessionId } from '../storage/local.ts';
import Loading from '../common/Loading.tsx';

function LeaveStartLine() {
  const navigate = useNavigate();
  const { gamestate, saveGamestate } = useContext(GameContext);
  const scoutingSessionId = getScoutingSessionId();
  const { preloaded } = gamestate;
  if (!scoutingSessionId) return <Loading />;
  return (
    <button
      onClick={() => {
        saveGamestate({ ...gamestate, left: true });
        navigate(
          leaveStartingLine(
            scoutingSessionId,
            gamestate.currentPhase,
            preloaded,
          ).url,
        );
      }}
    >
      Leave Starting Line
    </button>
  );
}
export default LeaveStartLine;
