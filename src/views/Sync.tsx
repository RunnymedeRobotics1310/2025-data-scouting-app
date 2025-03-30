import { isDevelopment } from '../dev/util.ts';
import RBSyncMain from './sub/RBSyncMain.tsx';
import SyncCount from './sub/SyncCount.tsx';
import DownloadTournamentsAndSchedule from './sub/DownloadTournamentsAndSchedule.tsx';

export default function Sync() {
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
        </>
      )}
    </>
  );
}
