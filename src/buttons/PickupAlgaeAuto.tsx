import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { AlgaeLocation, pickupAlgae } from '../functions/pickupAlgae.ts';
import Algae from '../common/Algae.tsx';

type PropTypes = {
  mode: Mode;
  location: AlgaeLocation;
};
function PickupAlgaeAuto(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  return (
    <button onClick={() => navigate(pickupAlgae(mode, props.location).url)}>
      <Algae />
    </button>
  );
}
export default PickupAlgaeAuto;
