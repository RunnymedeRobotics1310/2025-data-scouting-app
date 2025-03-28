import { useState } from 'react';
import RBScheduleAdmin from './RBScheduleAdmin.tsx';
import RBTournamentAdmin from './RBTournamentAdmin.tsx';

function RBSyncAdmin() {
  const [showTournamentAdmin, setShowTournamentAdmin] = useState(false);
  const [showScheduleAdmin, setShowScheduleAdmin] = useState(false);

  return (
    <div>
      <h2>Content Administration</h2>
      <p>
        This part of the app populates the back-end data store - it has nothing
        to do with sync.
      </p>
      <section>
        <button onClick={() => setShowTournamentAdmin(!showTournamentAdmin)}>
          Toggle Tournament Admin
        </button>
        {showTournamentAdmin && <RBTournamentAdmin />}
      </section>
      <section>
        <button onClick={() => setShowScheduleAdmin(!showScheduleAdmin)}>
          Toggle Schedule Admin
        </button>
        {showScheduleAdmin && <RBScheduleAdmin />}
      </section>
    </div>
  );
}
export default RBSyncAdmin;
