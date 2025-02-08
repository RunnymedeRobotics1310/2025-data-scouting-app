import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { CoralLocation, pickupCoral } from '../functions/pickupCoral.ts';

type PropTypes = {
  mode: Mode;
};
function PickupCoralLeft(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  return (
    <button onClick={() => navigate(pickupCoral(mode, CoralLocation.left).url)}>
      Left
    </button>
  );
}
export default PickupCoralLeft;
