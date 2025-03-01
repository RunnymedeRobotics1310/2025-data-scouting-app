import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { scoreAlgaeNet } from '../functions/scoreAlgaeNet.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';

type PropTypes = {
  mode: Mode;
};
function ScoreAlgaeNet(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, setGamestate } = useContext(GameContext);

  return (
    <button
      onClick={() => {
        navigate(scoreAlgaeNet(mode).url);
        setGamestate({ ...gamestate, holdingAlgae: false });
      }}
    >
      Score Net
    </button>
  );
}
export default ScoreAlgaeNet;
