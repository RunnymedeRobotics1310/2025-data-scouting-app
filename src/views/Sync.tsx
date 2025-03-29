import { isDevelopment } from '../dev/util.ts';
import RBSyncMain from './sub/RBSyncMain.tsx';

export default function Sync() {
  return (
    <>
      {/*<SyncGoogleApiLoader />*/}
      {isDevelopment() && (
        <>
          <hr />
          <h2>Synchronize Data to Raven Brain</h2>
          <p>
            This prototype is currently hidden behind the isDevelopment() check.
          </p>
          <RBSyncMain />
        </>
      )}
    </>
  );
}
