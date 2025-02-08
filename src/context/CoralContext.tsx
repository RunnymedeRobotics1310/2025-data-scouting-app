import { createContext } from 'react';

const setter: React.Dispatch<React.SetStateAction<boolean>> = () => {};

const CoralContext = createContext({
  preloaded: true,
  setPreloaded: setter,
});

export default CoralContext;
