import { Mode } from '../../common/mode.ts';
import { holding_algae } from '../../modes/holding_algae.ts';
import { holding_both } from '../../modes/holding_both.ts';
import RemoveAlgaeRemove from '../../buttons/RemoveAlgaeRemove.tsx';
import RemoveAlgaePluck from '../../buttons/RemoveAlgaePluck.tsx';
import FieldButton from '../../common/FieldButton.tsx';

type PropTypes = {
  mode: Mode;
  clearCallback: any;
};

function RemoveAlgaeOptions(props: PropTypes) {
  const mode = props.mode;
  const cb = props.clearCallback;
  return (
    <div>
      <FieldButton x={300} y={100} w={48} h={32}>
        <RemoveAlgaeRemove mode={mode} clearCallback={cb} />
      </FieldButton>
      {!(mode === holding_algae || mode === holding_both) && (
        <FieldButton x={300} y={125} w={48} h={32}>
          <RemoveAlgaePluck mode={mode} />
        </FieldButton>
      )}
    </div>
  );
}

export default RemoveAlgaeOptions;
