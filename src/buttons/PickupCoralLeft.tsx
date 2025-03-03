import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { CoralLocation, pickupCoral } from '../functions/pickupCoral.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';

type PropTypes = {
  mode: Mode;
};
function PickupCoralLeft(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, saveGamestate } = useContext(GameContext);
  const { scoutingSessionId } = gamestate;
  return (
    <button
      onClick={() => {
        navigate(pickupCoral(scoutingSessionId, mode, CoralLocation.left).url);
        saveGamestate({ ...gamestate, holdingCoral: true });
      }}
    >
      Left
    </button>
  );
}
export default PickupCoralLeft;
