export type PropTypes = {
  children: any;
  x: number;
  y: number;
  w: number;
  h: number;
};
export default function FieldButton(props: PropTypes) {
  return <div>{props.children}</div>;
}
