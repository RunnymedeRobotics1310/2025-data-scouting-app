import { Mode } from '../common/mode.ts';
import { AlgaeLocation, pickupAlgae } from '../functions/pickupAlgae.ts';
import { useNavigate } from 'react-router-dom';

type PropTypes = {
  mode: Mode;
};
function PickupAlgae(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  return (
    <button
      onClick={() => navigate(pickupAlgae(mode, AlgaeLocation.ground).url)}
    >
      Pickup Algae
    </button>
  );
}
export default PickupAlgae;
