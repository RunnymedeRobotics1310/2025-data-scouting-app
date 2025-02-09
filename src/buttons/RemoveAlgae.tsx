import Algae from '../common/Algae.tsx';

type PropTypes = {
  callback: any;
};
function RemoveAlgae(props: PropTypes) {
  const cb = props.callback;
  return (
    <button
      onClick={() => {
        console.log('remove algae menu');

        cb();
      }}
    >
      Remove <Algae />
    </button>
  );
}
export default RemoveAlgae;
