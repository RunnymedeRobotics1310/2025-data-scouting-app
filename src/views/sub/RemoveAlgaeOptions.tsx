import Modes from '../../common/modes.ts';
import { removeAlgae } from '../../functions/removeAlgae.ts';
import { useNavigate } from 'react-router-dom';
import { holding_algae } from '../../modes/holding_algae.ts';
import { holding_both } from '../../modes/holding_both.ts';

type PropTypes = {
  mode: Modes;
  clearCallback: any;
};
function removeAlgaeOptions(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const cb = props.clearCallback;
  return (
    <>
      <button
        onClick={() => {
          cb();
          navigate(removeAlgae(mode, false).url);
        }}
      >
        Remove
      </button>
      {!(mode === holding_algae || mode === holding_both) && (
        <button onClick={() => navigate(removeAlgae(mode, true).url)}>
          Pluck
        </button>
      )}
    </>
  );
}

export default removeAlgaeOptions;
