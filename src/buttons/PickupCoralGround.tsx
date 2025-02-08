import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { CoralLocation, pickupCoral } from '../functions/pickupCoral.ts';

type PropTypes = {
  mode: Mode;
};
function PickupCoralGround(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  return (
    <button
      onClick={() => navigate(pickupCoral(mode, CoralLocation.ground).url)}
    >
      Ground
    </button>
  );
}
export default PickupCoralGround;
