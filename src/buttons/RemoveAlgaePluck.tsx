import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { removeAlgae } from '../functions/removeAlgae.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';

type PropTypes = {
  mode: Mode;
};
function RemoveAlgaePluck(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, saveGamestate } = useContext(GameContext);
  return (
    <button
      onClick={() => {
        navigate(removeAlgae(mode, true).url);
        saveGamestate({ ...gamestate, holdingAlgae: true });
      }}
    >
      Pluck
    </button>
  );
}
export default RemoveAlgaePluck;
