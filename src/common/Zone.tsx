export type PropTypes = {
  children: any;
  zone: string;
  classes?: string;
};
export default function Zone(props: PropTypes) {
  const { zone, classes = '', children } = props;

  return <div className={`${zone} ${classes}`}>{children}</div>;
}
