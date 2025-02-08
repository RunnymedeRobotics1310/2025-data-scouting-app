import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { scoreReef } from '../functions/scoreReef.ts';

type PropTypes = {
  mode: Mode;
};
function ScoreReefL3(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;

  return <button onClick={() => navigate(scoreReef(mode, 3).url)}>3</button>;
}
export default ScoreReefL3;
