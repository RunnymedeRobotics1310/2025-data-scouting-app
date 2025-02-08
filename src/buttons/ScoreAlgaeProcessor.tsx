import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { scoreAlgaeProcessor } from '../functions/scoreAlgaeProcessor.ts';

type PropTypes = {
  mode: Mode;
};
function ScoreAlgaeProcessor(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  return (
    <button onClick={() => navigate(scoreAlgaeProcessor(mode).url)}>
      Score Processor
    </button>
  );
}
export default ScoreAlgaeProcessor;
