import { SyncGoogleApiLoader } from './sub/SyncGoogleApiLoader.tsx';
import RavenBrainSyncConnection from './sub/RavenBrainSyncConnection.tsx';
import { isDevelopment } from '../dev/util.ts';
import RBSyncMain from './sub/RBSyncMain.tsx';
import RBSyncAdmin from './sub/RBSyncAdmin.tsx';

export default function Sync() {
  return (
    <>
      <SyncGoogleApiLoader />
      {isDevelopment() && (
        <>
          <hr />
          <h2>Synchronize Data to Raven Brain</h2>
          <p>
            This prototype is currently hidden behind the isDevelopment() check.
          </p>
          <RavenBrainSyncConnection>
            <RBSyncMain />
            <RBSyncAdmin />
          </RavenBrainSyncConnection>
        </>
      )}
    </>
  );
}
