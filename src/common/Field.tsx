import { useContext } from 'react';
import AllianceContext from '../context/AllianceContext.tsx';

function Field(props: any) {
  const { isRed } = useContext(AllianceContext);
  return (
    <section className={isRed ? 'red-field-container' : 'blue-field-container'}>
      {props.children}
    </section>
  );
}

export default Field;
