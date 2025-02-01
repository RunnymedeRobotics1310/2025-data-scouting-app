import Modes from '../../common/modes.ts';
import { useNavigate } from 'react-router-dom';
import { scoreAlgaeNet } from '../../functions/scoreAlgaeNet.ts';
import { scoreAlgaeProcessor } from '../../functions/scoreAlgaeProcessor.ts';

type PropTypes = {
  mode: Modes;
};
function algaeScoreOptions(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;

  return (
    <div>
      <button onClick={() => navigate(scoreAlgaeNet(mode).url)}>
        Score Net
      </button>
      <button onClick={() => navigate(scoreAlgaeProcessor(mode).url)}>
        Score Processor
      </button>
    </div>
  );
}
export default algaeScoreOptions;
