import { createContext } from 'react';
import { Phase } from '../common/phase.ts';

const setter: React.Dispatch<React.SetStateAction<Phase>> = () => {};

type ContextProps = {
  currentPhase: Phase;
  setCurrentPhase: React.Dispatch<React.SetStateAction<Phase>>;
};

const PhaseContext = createContext<Partial<ContextProps>>({
  currentPhase: Phase.pre_match,
  setCurrentPhase: setter,
});

export default PhaseContext;
