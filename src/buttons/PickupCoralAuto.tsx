import { Mode } from '../common/mode.ts';
import { useNavigate } from 'react-router-dom';
import { CoralLocation, pickupCoral } from '../functions/pickupCoral.ts';
import Coral from '../common/Coral.tsx';
import GameContext from '../context/GameContext.tsx';
import { useContext } from 'react';

type PropTypes = {
  mode: Mode;
  location: CoralLocation;
};

function PickupCoralAuto(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const location = props.location;
  const { gamestate, setGamestate } = useContext(GameContext);
  return (
    <button
      onClick={() => {
        navigate(pickupCoral(mode, props.location).url);
        setGamestate({ ...gamestate, holdingCoral: true });

        if (location == CoralLocation.autoLeft) {
          setGamestate({ ...gamestate, pickedAutoCoralLeft: true });
        } else if (location == CoralLocation.autoCenter) {
          setGamestate({ ...gamestate, pickedAutoCoralCenter: true });
        } else if (location == CoralLocation.autoRight) {
          setGamestate({ ...gamestate, pickedAutoCoralRight: true });
        }
      }}
    >
      <Coral />
    </button>
  );
}
export default PickupCoralAuto;
