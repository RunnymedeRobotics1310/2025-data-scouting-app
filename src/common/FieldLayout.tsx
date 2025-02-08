import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import TeamContext from '../context/TeamContext.tsx';

function FieldLayout() {
  const { teamNumber } = useContext(TeamContext);
  return (
    <div>
      <p>I am the frame around the game board - this is the top</p>
      {teamNumber}
      <button>Sync</button>
      <button>Penalties</button>
      <button>whatever</button>
      <Outlet />
      <p>I am the frame around the game board - this is the bottom</p>
    </div>
  );
}
export default FieldLayout;
