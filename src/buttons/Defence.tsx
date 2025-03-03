import { toggleDefence } from '../functions/toggleDefence.ts';
import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';

function Defence() {
  const { gamestate } = useContext(GameContext);
  const { scoutingSessionId } = gamestate;
  return (
    <button onClick={() => toggleDefence(scoutingSessionId)}>Defence</button>
  );
}
export default Defence;
