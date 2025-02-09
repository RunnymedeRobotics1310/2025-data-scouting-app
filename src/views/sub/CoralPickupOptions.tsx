import { Mode } from '../../common/mode.ts';
import PickupCoralGround from '../../buttons/PickupCoralGround.tsx';
import PickupCoralLeft from '../../buttons/PickupCoralLeft.tsx';
import PickupCoralRight from '../../buttons/PickupCoralRight.tsx';
import Zone from '../../common/Zone.tsx';

type PropTypes = {
  mode: Mode;
};
function CoralPickupOptions(props: PropTypes) {
  const mode = props.mode;

  return (
    <>
      <Zone zone="driver-station">
        <PickupCoralGround mode={mode} />
      </Zone>
      <Zone zone="left-station">
        <PickupCoralLeft mode={mode} />
      </Zone>
      <Zone zone="right-station">
        <PickupCoralRight mode={mode} />
      </Zone>
    </>
  );
}

export default CoralPickupOptions;
