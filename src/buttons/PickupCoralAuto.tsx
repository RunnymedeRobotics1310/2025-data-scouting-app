import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { CoralLocation, pickupCoral } from '../functions/pickupCoral.ts';

type PropTypes = {
  mode: Mode;
  location: CoralLocation;
};
function PickupCoralAuto(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  return (
    <button onClick={() => navigate(pickupCoral(mode, props.location).url)}>
      Auto Coral
    </button>
  );
}
export default PickupCoralAuto;
