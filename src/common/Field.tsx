import { getScoutingSessionId } from '../storage/local.ts';
import Loading from './Loading.tsx';

function Field(props: any) {
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <Loading />;
  const isRed = scoutingSessionId.alliance == 'red';
  return (
    <section className={isRed ? 'red-field-container' : 'blue-field-container'}>
      {props.children}
      &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
      &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
      &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
      &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
    </section>
  );
}

export default Field;
