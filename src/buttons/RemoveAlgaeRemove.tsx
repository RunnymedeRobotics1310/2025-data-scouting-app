import { Mode } from '../common/mode.ts';
import { removeAlgae } from '../functions/removeAlgae.ts';
import { getScoutingSessionId } from '../storage/util.ts';
import Loading from '../common/Loading.tsx';

type PropTypes = {
  mode: Mode;
  clearCallback?: any;
};
function RemoveAlgaeRemove(props: PropTypes) {
  const mode = props.mode;
  const cb = props.clearCallback;
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;
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
