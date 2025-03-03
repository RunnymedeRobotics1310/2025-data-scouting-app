import { Mode } from '../common/mode.ts';
import { removeAlgae } from '../functions/removeAlgae.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';

type PropTypes = {
  mode: Mode;
  clearCallback?: any;
};
function RemoveAlgaeRemove(props: PropTypes) {
  const mode = props.mode;
  const cb = props.clearCallback;
  const { gamestate } = useContext(GameContext);
  const { scoutingSessionId } = gamestate;
  return (
    <button
      onClick={() => {
        if (cb) cb();
        removeAlgae(scoutingSessionId, mode, false);
      }}
    >
      Remove
    </button>
  );
}
export default RemoveAlgaeRemove;
