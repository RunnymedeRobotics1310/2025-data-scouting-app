import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { scoreReef } from '../functions/scoreReef.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';

type PropTypes = {
  mode: Mode;
};
function ScoreReefL2(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, saveGamestate } = useContext(GameContext);
  return (
    <button
      onClick={() => {
        navigate(scoreReef(mode, 2).url);
        saveGamestate({ ...gamestate, holdingCoral: false });
      }}
    >
      2
    </button>
  );
}
export default ScoreReefL2;
