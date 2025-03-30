export type PropTypes = {
  label: string;
  callback: any;
  disabled: boolean;
};
export default function Button(props: PropTypes) {
  return (
    <button disabled={props.disabled} onClick={() => props.callback()}>
      {props.label}
    </button>
  );
}
