type PropTypes = {
  callback: any;
};
function PickupCoral(props: PropTypes) {
  const cb = props.callback;
  return <button onClick={() => cb()}>Pickup Coral</button>;
}
export default PickupCoral;
