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
  const { gamestate, setGamestate } = useContext(GameContext);
  return (
    <button
      onClick={() => {
        navigate(scoreReef(mode, 4).url);
        setGamestate({ ...gamestate, holdingCoral: false });
      }}
    >
      4
    </button>
  );
}
export default ScoreReefL4;
