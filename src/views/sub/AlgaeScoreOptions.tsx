import { Mode } from '../../common/mode.ts';
import ScoreAlgaeNet from '../../buttons/ScoreAlgaeNet.tsx';
import ScoreAlgaeProcessor from '../../buttons/ScoreAlgaeProcessor.tsx';
import FieldButton from '../../common/FieldButton.tsx';

type PropTypes = {
  mode: Mode;
};
function AlgaeScoreOptions(props: PropTypes) {
  const mode = props.mode;

  return (
    <div>
      <FieldButton x={48} y={32} w={48} h={32}>
        <ScoreAlgaeNet mode={mode} />
      </FieldButton>
      <FieldButton x={324} y={100} w={48} h={32}>
        <ScoreAlgaeProcessor mode={mode} />
      </FieldButton>
    </div>
  );
}
export default AlgaeScoreOptions;
