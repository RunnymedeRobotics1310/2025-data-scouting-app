type PropTypes = {
  callback: any;
};
function ScoreReef(props: PropTypes) {
  const cb = props.callback;
  return <button onClick={() => cb()}>Score Reef</button>;
}
export default ScoreReef;
