import Modes from '../../common/modes.ts';
import { useNavigate } from 'react-router-dom';
import { CoralLocation, pickupCoral } from '../../functions/pickupCoral.ts';

type PropTypes = {
  mode: Modes;
};
function coralPickupOptions(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;

  return (
    <div>
      <button
        onClick={() => navigate(pickupCoral(mode, CoralLocation.ground).url)}
      >
        Ground
      </button>
      <button
        onClick={() => navigate(pickupCoral(mode, CoralLocation.left).url)}
      >
        Left
      </button>
      <button
        onClick={() => navigate(pickupCoral(mode, CoralLocation.right).url)}
      >
        Right
      </button>
    </div>
  );
}

export default coralPickupOptions;
