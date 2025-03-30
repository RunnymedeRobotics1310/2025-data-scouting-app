import { Mode } from '../common/mode.ts';
import { removeAlgae } from '../functions/removeAlgae.ts';
import { getScoutingSessionId } from '../storage/local.ts';
import Loading from '../common/Loading.tsx';
import { useContext, useEffect, useState } from 'react';
import GameContext from '../context/GameContext.tsx';

type PropTypes = {
  mode: Mode;
  clearCallback?: any;
};
function RemoveAlgaeRemove(props: PropTypes) {
  const mode = props.mode;
  const cb = props.clearCallback;
  const scoutingSessionId = getScoutingSessionId();
  const { gamestate } = useContext(GameContext);
  const [showRemoved, setShowRemoved] = useState(false);

  useEffect(() => {
    if (showRemoved) {
      const toRef = setTimeout(() => {
        setShowRemoved(false);
        clearTimeout(toRef);
      }, 1250);
    }
  }, [showRemoved]);

  if (!scoutingSessionId) return <Loading />;
  if (showRemoved) return <button disabled>Remove</button>;
  return (
    <button
      onClick={() => {
        if (cb) cb();
        removeAlgae(scoutingSessionId, gamestate.currentPhase, mode, false);
        setShowRemoved(true);
      }}
    >
      Remove
    </button>
  );
}
export default RemoveAlgaeRemove;
