function Layout(props: any) {
  return (
    <>
      <p>Cool layout header</p>
      {props.children}
      <p>Cool layout footer</p>
    </>
  );
}

export default Layout;
