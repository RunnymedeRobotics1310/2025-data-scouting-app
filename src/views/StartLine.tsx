import LeaveStartLine from '../buttons/LeaveStartLine.tsx';
import Zone from '../common/Zone.tsx';
import Field from '../common/Field.tsx';

function StartLine() {
  return (
    <Field>
      <Zone zone="start-zone">
        <LeaveStartLine />
      </Zone>
    </Field>
  );
}
export default StartLine;
