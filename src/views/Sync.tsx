import { isDevelopment } from '../dev/util.ts';
import RBSyncMain from './sub/RBSyncMain.tsx';
import SyncCount from './sub/SyncCount.tsx';
import DownloadTournamentsAndSchedule from './sub/DownloadTournamentsAndSchedule.tsx';
import { useNavigate } from 'react-router-dom';

export default function Sync() {
  const navigate = useNavigate();
  return (
    <>
      {/*<SyncGoogleApiLoader />*/}
      {isDevelopment() && (
        <>
          <hr />
          <h2>Tournament & Schedule Data</h2>
          <SyncCount />

          <DownloadTournamentsAndSchedule />
          <RBSyncMain />
          <button onClick={() => navigate('/')}>Return Home</button>
        </>
      )}
    </>
  );
}
