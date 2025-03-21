import { useEffect, useState } from 'react';
import {
  getAllTournaments,
  getScoutedSessionsForTournament,
  getUnsynchronizedEventsForSession,
} from './util.ts';

export function useUnsynchronizedItemCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let unsyncSession = 0;
      getAllTournaments().forEach(tournament => {
        getScoutedSessionsForTournament(tournament).forEach(session => {
          unsyncSession += getUnsynchronizedEventsForSession(session).length;
        });
      });
      setCount(unsyncSession); // Correct way to update state
    }, 5 * 1000);

    return () => clearInterval(interval); // Cleanup function
  }, []); // Empty dependency array ensures it runs only once

  return count;
}
