import { match_config } from '../modes/match_config.ts';

function MatchSelect() {
  return (
    <>
      <h1>Match Select</h1>
      <button onClick={() => window.location.assign(match_config.url)}>
        Next ---&gt;
      </button>
      <br />
      <img
        src={'requirements/screens/match-select.jpeg'}
        width={'25%'}
        alt={'Match Select'}
      />
    </>
  );
}
export default MatchSelect;
