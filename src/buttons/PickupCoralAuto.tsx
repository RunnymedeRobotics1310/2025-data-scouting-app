import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { CoralLocation, pickupCoral } from '../functions/pickupCoral.ts';
import Coral from '../common/Coral.tsx';
import GameContext from '../context/GameContext.tsx';
import { useContext } from 'react';
import { getScoutingSessionId } from '../storage/util.ts';
import Loading from '../common/Loading.tsx';

type PropTypes = {
  mode: Mode;
  location: CoralLocation;
};

function PickupCoralAuto(props: PropTypes) {
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
          pickupCoral(
            scoutingSessionId,
            gamestate.currentPhase,
            mode,
            props.location,
          ).url,
        );
        saveGamestate({ ...gamestate, holdingCoral: true });

        if (location == CoralLocation.autoLeft) {
          saveGamestate({ ...gamestate, pickedAutoCoralLeft: true });
        } else if (location == CoralLocation.autoCenter) {
          saveGamestate({ ...gamestate, pickedAutoCoralCenter: true });
        } else if (location == CoralLocation.autoRight) {
          saveGamestate({ ...gamestate, pickedAutoCoralRight: true });
        }
      }}
    >
      <Coral />
    </button>
  );
}
export default PickupCoralAuto;
