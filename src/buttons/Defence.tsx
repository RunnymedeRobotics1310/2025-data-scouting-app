import { toggleDefence } from '../functions/toggleDefence.ts';
import { getScoutingSessionId } from '../storage/util.ts';
import Loading from '../common/Loading.tsx';

function Defence() {
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;
  return (
    <button onClick={() => toggleDefence(scoutingSessionId)}>Defence</button>
  );
}
export default Defence;
