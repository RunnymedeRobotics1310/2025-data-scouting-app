import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { scoreAlgaeNet } from '../functions/scoreAlgaeNet.ts';

type PropTypes = {
  mode: Mode;
};
function ScoreAlgaeNet(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  return (
    <button onClick={() => navigate(scoreAlgaeNet(mode).url)}>Score Net</button>
  );
}
export default ScoreAlgaeNet;
