import { createContext } from 'react';

const setter: React.Dispatch<React.SetStateAction<number>> = () => {};

const TeamContext = createContext({
  teamNumber: 0,
  setTeamNumber: setter,
});

export default TeamContext;
