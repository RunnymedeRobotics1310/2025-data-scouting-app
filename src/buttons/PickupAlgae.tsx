import { Mode } from '../common/mode.ts';
import { AlgaeLocation, pickupAlgae } from '../functions/pickupAlgae.ts';
import { useNavigate } from 'react-router-dom';
import Algae from '../common/Algae.tsx';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';
import { getScoutingSessionId } from '../storage/util.ts';
import Loading from '../common/Loading.tsx';

type PropTypes = {
  mode: Mode;
};
function PickupAlgae(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, saveGamestate } = useContext(GameContext);
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;
  return (
    <button
      onClick={() => {
        navigate(
          pickupAlgae(scoutingSessionId, mode, AlgaeLocation.ground).url,
        );
        saveGamestate({ ...gamestate, holdingAlgae: true });
      }}
    >
      Pickup <Algae />
    </button>
  );
}
export default PickupAlgae;
