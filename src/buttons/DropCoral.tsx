import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { dropCoral } from '../functions/dropCoral.ts';
import Coral from '../common/Coral.tsx';

type PropTypes = {
  mode: Mode;
};
function DropCoral(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  return (
    <button onClick={() => navigate(dropCoral(mode).url)}>
      Drop <Coral />
    </button>
  );
}
export default DropCoral;
