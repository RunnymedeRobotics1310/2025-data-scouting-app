import LeaveStartLine from '../buttons/LeaveStartLine.tsx';
import FieldButton from '../common/FieldButton.tsx';
import FieldImage from '../common/FieldImage.tsx';

function StartLine() {
  return (
    <div>
      <h1>Start Line</h1>

      <FieldImage />
      <FieldButton x={175} y={40} w={300} h={32}>
        <LeaveStartLine />
      </FieldButton>
    </div>
  );
}
export default StartLine;
