import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { scoreReef } from '../functions/scoreReef.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';

type PropTypes = {
  mode: Mode;
};
function ScoreReefL4(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, saveGamestate } = useContext(GameContext);
  const { scoutingSessionId } = gamestate;
  return (
    <button
      onClick={() => {
        navigate(scoreReef(scoutingSessionId, mode, 4).url);
        saveGamestate({ ...gamestate, holdingCoral: false });
      }}
    >
      4
    </button>
  );
}
export default ScoreReefL4;
