import { Mode } from '../../common/mode.ts';
import ScoreAlgaeNet from '../../buttons/ScoreAlgaeNet.tsx';
import ScoreAlgaeProcessor from '../../buttons/ScoreAlgaeProcessor.tsx';
import Zone from '../../common/Zone.tsx';

type PropTypes = {
  mode: Mode;
};
function AlgaeScoreOptions(props: PropTypes) {
  const mode = props.mode;

  return (
    <>
      <Zone zone="barge-left">
        <ScoreAlgaeNet mode={mode} />
      </Zone>
      <Zone zone="behind-reef" classes={'top left'}>
        <ScoreAlgaeProcessor mode={mode} />
      </Zone>
    </>
  );
}
export default AlgaeScoreOptions;
