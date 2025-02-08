export type PropTypes = {
  label: string;
  callback: any;
};
export default function Button(props: PropTypes) {
  return <button onClick={() => props.callback()}>{props.label}</button>;
}
