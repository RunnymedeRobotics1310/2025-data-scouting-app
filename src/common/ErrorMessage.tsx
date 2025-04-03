function ErrorMessage(props: any) {
  return (
    <div className={'errorMessage'}>
      <strong>OOPS! An error has occurred:</strong>
      <br />
      {props.children}
    </div>
  );
}
export default ErrorMessage;
