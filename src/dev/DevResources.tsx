import ModeComponent from './Modes.tsx';
import Functions from './Functions.tsx';
import { useState } from 'react';
import ViewsFromLeia from './ViewsFromLeia.tsx';
import MatchSelect from '../views/MatchSelect.tsx';
import MatchConfig from '../views/MatchConfig.tsx';
import StartLine from '../views/StartLine.tsx';
import HoldingNothing from '../views/HoldingNothing.tsx';
import HoldingCoral from '../views/HoldingCoral.tsx';
import HoldingAlgae from '../views/HoldingAlgae.tsx';
import HoldingBoth from '../views/HoldingBoth.tsx';
import Park from '../views/Park.tsx';
import StartClimb from '../views/StartClimb.tsx';
import FinishClimb from '../views/FinishClimb.tsx';
import Checklist from '../views/Checklist.tsx';
import HumanFeedback from '../views/HumanFeedback.tsx';

function DevResources() {
  const [leiaScreens, setLeiaScreens] = useState(false);
  const [planning, setPlanning] = useState(false);
  const [functions, setFunctions] = useState(false);
  const [modeExamples, setModeExamples] = useState(false);
  return (
    <>
      <button onClick={() => setLeiaScreens(!leiaScreens)}>
        Toggle views from Leia
      </button>
      {leiaScreens ? <ViewsFromLeia /> : null}
      <br />
      <button onClick={() => setPlanning(!planning)}>Toggle planning</button>
      {planning ? (
        <>
          <ModeComponent />
        </>
      ) : null}
      <br />
      <button onClick={() => setFunctions(!functions)}>Toggle Functions</button>
      {functions ? <Functions /> : null}
      <br />
      <button onClick={() => setModeExamples(!modeExamples)}>
        Toggle mode examples
      </button>
      {modeExamples ? (
        <>
          <MatchSelect />
          <MatchConfig />
          <StartLine />
          <HoldingNothing />
          <HoldingCoral />
          <HoldingAlgae />
          <HoldingBoth />
          <Park />
          <StartClimb />
          <FinishClimb />
          <Checklist />
          <HumanFeedback />
        </>
      ) : null}
    </>
  );
}
export default DevResources;
