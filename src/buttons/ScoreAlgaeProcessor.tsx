import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { scoreAlgaeProcessor } from '../functions/scoreAlgaeProcessor.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';
import { getScoutingSessionId } from '../storage/util.ts';
import Loading from '../common/Loading.tsx';

type PropTypes = {
  mode: Mode;
};
function ScoreAlgaeProcessor(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, saveGamestate } = useContext(GameContext);
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;

  return (
    <button
      onClick={() => {
        navigate(
          scoreAlgaeProcessor(scoutingSessionId, gamestate.currentPhase, mode)
            .url,
        );
        saveGamestate({ ...gamestate, holdingAlgae: false });
      }}
    >
      Score Processor
    </button>
  );
}
export default ScoreAlgaeProcessor;
