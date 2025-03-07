import { Link, Outlet, useNavigate } from 'react-router-dom';
import Sync from '../icons/Sync.tsx';
import logoUrl from '/src/assets/images/logo.png';
import titleUrl from '/src/assets/images/title.png';
import { isDevelopment } from '../dev/util.ts';
import VersionDisplay from './VersionDisplay.tsx';

function AppLayout() {
  const navigate = useNavigate();
  function sync() {
    navigate('/sync');
  }
  return (
    <section id="layout">
      <header>
        <div id="logo">
          <Link to={'/'}>
            <img src={logoUrl} alt="Runnymede Robotics" />
          </Link>
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
        <section>
          <div>&copy; 2025 Runnymede Robotics Team 1310</div>
          <VersionDisplay />
        </section>
        {isDevelopment() && (
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
        )}
      </footer>
    </section>
  );
}

export default AppLayout;
