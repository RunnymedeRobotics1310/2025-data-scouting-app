type PropTypes = {
  callback: any;
};
function ScoreAlgae(props: PropTypes) {
  const cb = props.callback;
  return <button onClick={() => cb()}>Score Algae</button>;
}
export default ScoreAlgae;
