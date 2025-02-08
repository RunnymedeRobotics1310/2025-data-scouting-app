import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { removeAlgae } from '../functions/removeAlgae.ts';

type PropTypes = {
  mode: Mode;
};
function RemoveAlgaePluck(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  return (
    <button onClick={() => navigate(removeAlgae(mode, true).url)}>Pluck</button>
  );
}
export default RemoveAlgaePluck;
