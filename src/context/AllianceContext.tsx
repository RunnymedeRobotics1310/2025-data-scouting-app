import { createContext } from 'react';

const setter: React.Dispatch<React.SetStateAction<boolean>> = () => {};

const AllianceContext = createContext({
  isRed: true,
  setIsRed: setter,
});

export default AllianceContext;
