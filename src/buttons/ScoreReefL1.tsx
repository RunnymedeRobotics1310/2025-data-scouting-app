import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { scoreReef } from '../functions/scoreReef.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';
import { getScoutingSessionId } from '../storage/local.ts';
import Loading from '../common/Loading.tsx';

type PropTypes = {
  mode: Mode;
};
function ScoreReefL1(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, saveGamestate } = useContext(GameContext);
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;
  return (
    <button
      onClick={() => {
        navigate(
          scoreReef(scoutingSessionId, gamestate.currentPhase, mode, 1).url,
        );
        saveGamestate({ ...gamestate, holdingCoral: false });
      }}
    >
      1
    </button>
  );
}
export default ScoreReefL1;
