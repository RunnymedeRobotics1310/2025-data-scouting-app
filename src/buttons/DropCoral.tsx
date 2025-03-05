import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { dropCoral } from '../functions/dropCoral.ts';
import Coral from '../common/Coral.tsx';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';
import { getScoutingSessionId } from '../storage/util.ts';
import Loading from '../common/Loading.tsx';

type PropTypes = {
  mode: Mode;
};
function DropCoral(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, saveGamestate } = useContext(GameContext);
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;
  return (
    <button
      onClick={() => {
        navigate(dropCoral(scoutingSessionId, mode).url);
        saveGamestate({ ...gamestate, holdingCoral: false });
      }}
    >
      Drop <Coral />
    </button>
  );
}
export default DropCoral;
