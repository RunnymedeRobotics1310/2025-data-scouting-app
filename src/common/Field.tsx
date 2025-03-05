import { getScoutingSessionId } from '../storage/util.ts';
import Loading from './Loading.tsx';

function Field(props: any) {
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;
  const isRed = scoutingSessionId.alliance == 'red';
  return (
    <section className={isRed ? 'red-field-container' : 'blue-field-container'}>
      {props.children}
    </section>
  );
}

export default Field;
