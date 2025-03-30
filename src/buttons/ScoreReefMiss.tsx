import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_both } from '../modes/holding_both.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';
import { addEvent, getScoutingSessionId } from '../storage/local.ts';
import Loading from '../common/Loading.tsx';

type PropTypes = {
  mode: Mode;
};
function ScoreReefMiss(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, saveGamestate } = useContext(GameContext);
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;

  function missCoral() {
    if (!scoutingSessionId) return <Loading />;
    console.log('Missed coral from ' + mode.label);

    addEvent(scoutingSessionId, gamestate.currentPhase, 'score-reef-miss');
    navigate((mode == holding_both ? holding_algae : holding_nothing).url);
    saveGamestate({ ...gamestate, holdingCoral: false });
  }

  return <button onClick={() => missCoral()}>Oopsie</button>;
}
export default ScoreReefMiss;
