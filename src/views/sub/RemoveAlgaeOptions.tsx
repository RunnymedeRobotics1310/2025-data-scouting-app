import { Mode } from '../../common/mode.ts';
import { holding_algae } from '../../modes/holding_algae.ts';
import { holding_both } from '../../modes/holding_both.ts';
import RemoveAlgaeRemove from '../../buttons/RemoveAlgaeRemove.tsx';
import RemoveAlgaePluck from '../../buttons/RemoveAlgaePluck.tsx';
import Zone from '../../common/Zone.tsx';

type PropTypes = {
  mode: Mode;
  clearCallback: any;
};

function RemoveAlgaeOptions(props: PropTypes) {
  const mode = props.mode;
  const cb = props.clearCallback;
  return (
    <Zone zone="reef-right">
      <RemoveAlgaeRemove mode={mode} clearCallback={cb} />
      {!(mode === holding_algae || mode === holding_both) && (
        <RemoveAlgaePluck mode={mode} />
      )}
    </Zone>
  );
}

export default RemoveAlgaeOptions;
