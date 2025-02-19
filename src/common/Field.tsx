import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';

function Field(props: any) {
  const { gamestate } = useContext(GameContext);
  const { isRed } = gamestate;
  return (
    <section className={isRed ? 'red-field-container' : 'blue-field-container'}>
      {props.children}
    </section>
  );
}

export default Field;
