import { Link, Outlet } from 'react-router-dom';
import Sync from '../icons/Sync.tsx';

function AppLayout() {
  function sync() {
    console.log("Help me, I'm syncing!");
  }
  return (
    <section id="layout">
      <header>
        <div id="logo">
          <img src="/images/logo.png" alt="Runnymede Robotics" />
        </div>
        <div id="title">
          <img src="/images/title.png" alt="1310 Raven Eye" />
        </div>
        <div className={'sync-button'}>
          <span className={'button'} onClick={() => sync()}>
            <Sync />
          </span>
        </div>
      </header>
      <Outlet />
      <footer>
        <div>&copy; 2025 Runnymede Robotics Team 1310</div>
        <menu id="menu">
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
            <Link to={'/game/holding-nothing'}>Holding Nothing</Link>
          </li>
          <li>
            <Link to={'/dev'}>Developer Resources</Link>
          </li>
        </menu>
      </footer>
    </section>
  );
}

export default AppLayout;
