import { Mode } from '../../common/mode.ts';
import ScoreReefMiss from '../../buttons/ScoreReefMiss.tsx';
import ScoreReefL1 from '../../buttons/ScoreReefL1.tsx';
import ScoreReefL2 from '../../buttons/ScoreReefL2.tsx';
import ScoreReefL3 from '../../buttons/ScoreReefL3.tsx';
import ScoreReefL4 from '../../buttons/ScoreReefL4.tsx';
import FieldButton from '../../common/FieldButton.tsx';

type PropTypes = {
  mode: Mode;
};
function ReefScoreOptions(props: PropTypes) {
  const mode = props.mode;

  return (
    <div>
      <FieldButton x={175} y={150} w={24} h={16}>
        <ScoreReefMiss mode={mode} />
      </FieldButton>
      <FieldButton x={151} y={125} w={16} h={16}>
        <ScoreReefL1 mode={mode} />
      </FieldButton>
      <FieldButton x={167} y={125} w={16} h={16}>
        <ScoreReefL2 mode={mode} />
      </FieldButton>
      <FieldButton x={158} y={125} w={16} h={16}>
        <ScoreReefL3 mode={mode} />
      </FieldButton>
      <FieldButton x={174} y={125} w={16} h={16}>
        <ScoreReefL4 mode={mode} />
      </FieldButton>
    </div>
  );
}

export default ReefScoreOptions;
