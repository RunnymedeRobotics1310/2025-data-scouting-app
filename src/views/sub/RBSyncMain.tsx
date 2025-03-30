import Spinner from '../../common/Spinner.tsx';
import { useState } from 'react';

function RBSyncMain() {
  const [content, setContent] = useState('');
  const [syncing, setSyncing] = useState(false);

  function handleSyncClick() {
    console.log("Help me, I'm syncing!");
  }

  return (
    <div>
      <h3>Sync Scouting Data</h3>
      <p>
        Synchronize your data with RavenBrain. Your data is stored locally on
        your browser, so it is not necessary to sync after each match. However,
        syncing will copy your data up to our repository so that the strategy
        team can analyze team performance. Simply connect to the internet with
        your device and press the sync button. You'll have to enter the password
        provided to you by the team.
      </p>
      {syncing && (
        <div>
          <Spinner />
          Syncing...
        </div>
      )}
      <button onClick={() => handleSyncClick()}>Sync Scouting Data</button>
      <p>&nbsp;</p>
      <h4>Sync Status Messages</h4>
      <pre id="content" className="googleExampleContentPreStyle">
        {content}
      </pre>
    </div>
  );
}
export default RBSyncMain;
