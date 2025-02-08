import { useContext } from 'react';
import AllianceContext from '../context/AllianceContext.tsx';

export default function () {
  const { isRed } = useContext(AllianceContext);
  if (isRed) {
    return (
      <img
        src={'/requirements/fields/reefscape-red.png'}
        width={'350'}
        alt={'Field'}
      />
    );
  } else {
    return (
      <img
        src={'/requirements/fields/reefscape-blue.png'}
        width={'350'}
        alt={'Field'}
      />
    );
  }
}
