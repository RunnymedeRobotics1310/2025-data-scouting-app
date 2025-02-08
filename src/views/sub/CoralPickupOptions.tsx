import { Mode } from '../../common/mode.ts';
import PickupCoralGround from '../../buttons/PickupCoralGround.tsx';
import PickupCoralLeft from '../../buttons/PickupCoralLeft.tsx';
import PickupCoralRight from '../../buttons/PickupCoralRight.tsx';
import FieldButton from '../../common/FieldButton.tsx';

type PropTypes = {
  mode: Mode;
};
function CoralPickupOptions(props: PropTypes) {
  const mode = props.mode;

  return (
    <div>
      <FieldButton x={175} y={350} w={64} h={32}>
        <PickupCoralGround mode={mode} />
      </FieldButton>
      <FieldButton x={150} y={325} w={64} h={32}>
        <PickupCoralLeft mode={mode} />
      </FieldButton>
      <FieldButton x={200} y={325} w={64} h={32}>
        <PickupCoralRight mode={mode} />
      </FieldButton>
    </div>
  );
}

export default CoralPickupOptions;
