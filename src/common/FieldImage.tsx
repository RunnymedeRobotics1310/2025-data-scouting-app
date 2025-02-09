import { useContext } from 'react';
import AllianceContext from '../context/AllianceContext.tsx';

export default function () {
  const { isRed } = useContext(AllianceContext);
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
