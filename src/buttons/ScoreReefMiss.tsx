import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_both } from '../modes/holding_both.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';

type PropTypes = {
  mode: Mode;
};
function ScoreReefMiss(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, setGamestate } = useContext(GameContext);

  function missCoral() {
    console.log('Missed coral from ' + mode.label);
    //TODO: Save Missed Coral
    navigate((mode == holding_both ? holding_algae : holding_nothing).url);
    setGamestate({ ...gamestate, holdingCoral: false });
  }

  return <button onClick={() => missCoral()}>Oopsie</button>;
}
export default ScoreReefMiss;
