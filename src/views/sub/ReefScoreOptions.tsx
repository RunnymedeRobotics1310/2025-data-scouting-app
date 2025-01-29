import { holding_nothing } from '../../modes/holding_nothing.ts';
import { useNavigate } from 'react-router-dom';
import Modes from '../../common/modes.ts';
import { scoreReef } from '../../actions/scoreReef.ts';

type PropTypes = {
  mode: Modes;
};
function ReefScoreOptions(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;

  function missCoral() {
    console.log('Missed coral from ' + mode.label);
    navigate(holding_nothing.url);
  }

  return (
    <div>
      <button onClick={() => missCoral()}>Oopsie</button>
      <button onClick={() => navigate(scoreReef(mode, 1).url)}>1</button>
      <button onClick={() => navigate(scoreReef(mode, 2).url)}>2</button>
      <button onClick={() => navigate(scoreReef(mode, 3).url)}>3</button>
      <button onClick={() => navigate(scoreReef(mode, 4).url)}>4</button>
    </div>
  );
}

export default ReefScoreOptions;
