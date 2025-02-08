import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { scoreReef } from '../functions/scoreReef.ts';

type PropTypes = {
  mode: Mode;
};
function ScoreReefL1(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;

  return <button onClick={() => navigate(scoreReef(mode, 1).url)}>1</button>;
}
export default ScoreReefL1;
