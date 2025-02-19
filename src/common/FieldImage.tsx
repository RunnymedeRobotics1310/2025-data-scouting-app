import { useContext } from 'react';
import GameContext from '../context/GameContext.tsx';

export default function () {
  const { gamestate } = useContext(GameContext);
  const { isRed } = gamestate;
  if (isRed) {
    return (
      <img
        src={'/requirements/fields/reefscape-red.png'}
        className={'field-image'}
        alt={'Field'}
      />
    );
  } else {
    return (
      <img
        src={'/requirements/fields/reefscape-blue.png'}
        className={'field-image'}
        alt={'Field'}
      />
    );
  }
}
