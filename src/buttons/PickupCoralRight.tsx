import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { CoralLocation, pickupCoral } from '../functions/pickupCoral.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';
import { getScoutingSessionId } from '../storage/local.ts';
import Loading from '../common/Loading.tsx';

type PropTypes = {
  mode: Mode;
};
function PickupCoralRight(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, saveGamestate } = useContext(GameContext);
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;
  return (
    <button
      onClick={() => {
        navigate(
          pickupCoral(
            scoutingSessionId,
            gamestate.currentPhase,
            mode,
            CoralLocation.right,
          ).url,
        );
        saveGamestate({ ...gamestate, holdingCoral: true });
      }}
    >
      Right
    </button>
  );
}
export default PickupCoralRight;
