import { Mode } from '../common/mode.ts';
import { removeAlgae } from '../functions/removeAlgae.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';
import { useNavigate } from 'react-router-dom';
import { getScoutingSessionId } from '../storage/util.ts';
import Loading from '../common/Loading.tsx';

type PropTypes = {
  mode: Mode;
};
function RemoveAlgaePluck(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, saveGamestate } = useContext(GameContext);
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;
  return (
    <button
      onClick={() => {
        navigate(removeAlgae(scoutingSessionId, mode, true).url);
        saveGamestate({ ...gamestate, holdingAlgae: true });
      }}
    >
      Pluck
    </button>
  );
}
export default RemoveAlgaePluck;
