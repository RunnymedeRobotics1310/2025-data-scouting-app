import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { dropAlgae } from '../functions/dropAlgae.ts';
import Algae from '../common/Algae.tsx';

type PropTypes = {
  mode: Mode;
};
function DropAlgae(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  return (
    <button onClick={() => navigate(dropAlgae(mode).url)}>
      Drop <Algae />
    </button>
  );
}
export default DropAlgae;
