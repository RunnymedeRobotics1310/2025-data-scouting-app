import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { AlgaeLocation, pickupAlgae } from '../functions/pickupAlgae.ts';
import Algae from '../common/Algae.tsx';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';
import { getScoutingSessionId } from '../storage/local.ts';
import Loading from '../common/Loading.tsx';

type PropTypes = {
  mode: Mode;
  location: AlgaeLocation;
};
function PickupAlgaeAuto(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const location = props.location;
  const { gamestate, saveGamestate } = useContext(GameContext);
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;
  return (
    <button
      className={'camoButton'}
      onClick={() => {
        navigate(
          pickupAlgae(
            scoutingSessionId,
            gamestate.currentPhase,
            mode,
            props.location,
          ).url,
        );
        saveGamestate({ ...gamestate, holdingAlgae: true });

        if (location == AlgaeLocation.autoLeft) {
          saveGamestate({ ...gamestate, pickedAutoAlgaeLeft: true });
        } else if (location == AlgaeLocation.autoCenter) {
          saveGamestate({ ...gamestate, pickedAutoAlgaeCenter: true });
        } else if (location == AlgaeLocation.autoRight) {
          saveGamestate({ ...gamestate, pickedAutoAlgaeRight: true });
        }
      }}
    >
      <Algae />
    </button>
  );
}
export default PickupAlgaeAuto;
