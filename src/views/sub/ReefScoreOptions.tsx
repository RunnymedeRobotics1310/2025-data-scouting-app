import { Mode } from '../../common/mode.ts';
import ScoreReefMiss from '../../buttons/ScoreReefMiss.tsx';
import ScoreReefL1 from '../../buttons/ScoreReefL1.tsx';
import ScoreReefL2 from '../../buttons/ScoreReefL2.tsx';
import ScoreReefL3 from '../../buttons/ScoreReefL3.tsx';
import ScoreReefL4 from '../../buttons/ScoreReefL4.tsx';
import Zone from '../../common/Zone.tsx';

type PropTypes = {
  mode: Mode;
};
function ReefScoreOptions(props: PropTypes) {
  const mode = props.mode;

  return (
    <Zone zone="behind-reef" classes={'bottom'}>
      <div>
        <ScoreReefL1 mode={mode} />
        <ScoreReefL2 mode={mode} />
        <ScoreReefL3 mode={mode} />
        <ScoreReefL4 mode={mode} />
      </div>
      <ScoreReefMiss mode={mode} />
    </Zone>
  );
}

export default ReefScoreOptions;
