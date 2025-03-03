import { Link, Outlet } from 'react-router-dom';
import Sync from '../icons/Sync.tsx';
import logoUrl from '/src/assets/images/logo.png';
import titleUrl from '/src/assets/images/title.png';

function AppLayout() {
  function sync() {
    console.log("Help me, I'm syncing!");
  }
  return (
    <section id="layout">
      <header>
        <div id="logo">
          <img src={logoUrl} alt="Runnymede Robotics" />
        </div>
        <div id="title">
          <img src={titleUrl} alt="1310 Raven Eye" />
        </div>
        <div className={'sync-button'}>
          <span className={'button'} onClick={() => sync()}>
            <Sync />
          </span>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
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
