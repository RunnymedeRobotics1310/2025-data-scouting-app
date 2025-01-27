import ModeComponent from './Modes.tsx';
import Functions from './Functions.tsx';
import { useState } from 'react';
import ViewsFromLeia from './ViewsFromLeia.tsx';

function DevResources() {
  const [leiaScreens, setLeiaScreens] = useState(false);
  return (
    <>
      <button onClick={() => setLeiaScreens(!leiaScreens)}>
        Toggle views from Leia
      </button>
      {leiaScreens ? <ViewsFromLeia /> : null}
      <ModeComponent />
      <Functions />
    </>
  );
}
export default DevResources;
