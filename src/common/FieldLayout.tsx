import { Outlet } from 'react-router-dom';

function FieldLayout() {
  return (
    <div>
      <p>I am the frame around the game board - this is the top</p>
      <button>Sync</button>
      <button>Penalties</button>
      <button>whatever</button>
      <Outlet />
      <p>I am the frame around the game board - this is the bottom</p>
    </div>
  );
}
export default FieldLayout;
