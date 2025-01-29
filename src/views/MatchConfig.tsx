import { start_line } from '../modes/start_line.ts';

function MatchConfig() {
  return (
    <>
      <h1>Match Config</h1>
      <button onClick={() => window.location.assign(start_line.url)}>
        Start ---&gt;
      </button>
      <br />
      <img
        src={'requirements/screens/match-config.jpeg'}
        width={'25%'}
        alt={'Match Config'}
      />
    </>
  );
}
export default MatchConfig;
