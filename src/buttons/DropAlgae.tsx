import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { dropAlgae } from '../functions/dropAlgae.ts';
import Algae from '../common/Algae.tsx';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';

type PropTypes = {
  mode: Mode;
};
function DropAlgae(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, setGamestate } = useContext(GameContext);

  return (
    <button
      onClick={() => {
        navigate(dropAlgae(mode).url);
        setGamestate({ ...gamestate, holdingAlgae: false });
      }}
    >
      Drop <Algae />
    </button>
  );
}
export default DropAlgae;
