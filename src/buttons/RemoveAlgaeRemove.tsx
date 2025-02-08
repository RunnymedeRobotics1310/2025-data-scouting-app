import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { removeAlgae } from '../functions/removeAlgae.ts';

type PropTypes = {
  mode: Mode;
  clearCallback?: any;
};
function RemoveAlgaeRemove(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const cb = props.clearCallback;
  return (
    <button
      onClick={() => {
        if (cb) cb();
        navigate(removeAlgae(mode, false).url);
      }}
    >
      Remove
    </button>
  );
}
export default RemoveAlgaeRemove;
