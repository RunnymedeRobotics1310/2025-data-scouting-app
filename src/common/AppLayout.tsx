import { Link, Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <>
      <img src="/images/logo.png" alt="Runnymede Robotics" width="25%" />
      <h1>Team 1310 Runnymede Robotics Data Scouting App</h1>

      <menu>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/game/endgame'}>Endgame</Link>
        </li>
        <li>
          <Link to={'/match-select'}>Match Select</Link>
        </li>
        <li>
          <Link to={'/foo'}>Foo</Link>
        </li>
      </menu>
      <Outlet />
      <footer>
        <div>&copy; 2025 Runnymede Robotics Team 1310</div>
        <div>
          <Link to={'/dev'}>Developer Resources</Link>
        </div>
      </footer>
    </>
  );
}

export default AppLayout;
