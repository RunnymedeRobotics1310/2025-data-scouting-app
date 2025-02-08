import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { scoreReef } from '../functions/scoreReef.ts';

type PropTypes = {
  mode: Mode;
};
function ScoreReefL2(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;

  return <button onClick={() => navigate(scoreReef(mode, 2).url)}>2</button>;
}
export default ScoreReefL2;
