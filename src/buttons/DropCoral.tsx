import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { dropCoral } from '../functions/dropCoral.ts';
import Coral from '../common/Coral.tsx';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';

type PropTypes = {
  mode: Mode;
};
function DropCoral(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, setGamestate } = useContext(GameContext);
  return (
    <button
      onClick={() => {
        navigate(dropCoral(mode).url);
        setGamestate({ ...gamestate, holdingCoral: false });
      }}
    >
      Drop <Coral />
    </button>
  );
}
export default DropCoral;
