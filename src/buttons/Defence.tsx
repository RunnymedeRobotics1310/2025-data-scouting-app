import { startDefence, stopDefence } from '../functions/toggleDefence.ts';
import { getScoutingSessionId } from '../storage/local.ts';
import Loading from '../common/Loading.tsx';
import { useEffect, useState } from 'react';
import { ScoutingSessionId } from '../types/ScoutingSessionId.ts';

function Defence() {
  const scoutingSessionId = getScoutingSessionId();
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [displaySeconds, setDisplaySeconds] = useState(0);

  function elapsedSeconds(): number {
    if (!startTime) return 0;
    const now = new Date();
    return Math.floor((now.getTime() - startTime.getTime()) / 1000);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime) {
        const sec = elapsedSeconds();
        console.log('Defending', sec);
        setDisplaySeconds(sec);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  if (!scoutingSessionId) return <Loading />;

  function toggle(scoutingSessionId: ScoutingSessionId): void {
    if (!startTime) {
      setStartTime(new Date());
      startDefence(scoutingSessionId);
    } else {
      setStartTime(null);
      setDisplaySeconds(0);
      stopDefence(scoutingSessionId, displaySeconds);
    }
  }

  return startTime ? (
    <button onClick={() => toggle(scoutingSessionId)}>
      Stop Defence ({displaySeconds}s )
    </button>
  ) : (
    <button onClick={() => toggle(scoutingSessionId)}>Start Defence</button>
  );
}
export default Defence;
