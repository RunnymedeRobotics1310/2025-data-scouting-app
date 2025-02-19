import { Mode } from '../common/mode.ts';
import { AlgaeLocation, pickupAlgae } from '../functions/pickupAlgae.ts';
import { useNavigate } from 'react-router-dom';
import Algae from '../common/Algae.tsx';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';

type PropTypes = {
  mode: Mode;
};
function PickupAlgae(props: PropTypes) {
  const navigate = useNavigate();
  const mode = props.mode;
  const { gamestate, setGamestate } = useContext(GameContext);
  return (
    <button
      onClick={() => {
        navigate(pickupAlgae(mode, AlgaeLocation.ground).url);
        setGamestate({ ...gamestate, holdingAlgae: true });
      }}
    >
      Pickup <Algae />
    </button>
  );
}
export default PickupAlgae;
