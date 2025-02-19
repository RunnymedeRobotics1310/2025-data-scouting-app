import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { AlgaeLocation, pickupAlgae } from '../functions/pickupAlgae.ts';
import Algae from '../common/Algae.tsx';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';

type PropTypes = {
  mode: Mode;
  location: AlgaeLocation;
};
function PickupAlgaeAuto(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const location = props.location;
  const { gamestate, setGamestate } = useContext(GameContext);
  return (
    <button
      onClick={() => {
        navigate(pickupAlgae(mode, props.location).url);
        setGamestate({ ...gamestate, holdingAlgae: true });

        if (location == AlgaeLocation.autoLeft) {
          setGamestate({ ...gamestate, pickedAutoAlgaeLeft: true });
        } else if (location == AlgaeLocation.autoCenter) {
          setGamestate({ ...gamestate, pickedAutoAlgaeCenter: true });
        } else if (location == AlgaeLocation.autoRight) {
          setGamestate({ ...gamestate, pickedAutoAlgaeRight: true });
        }
      }}
    >
      <Algae />
    </button>
  );
}
export default PickupAlgaeAuto;
