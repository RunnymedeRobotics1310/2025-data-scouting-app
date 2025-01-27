import MatchSelect from './views/MatchSelect.tsx';
import MatchConfig from './views/MatchConfig.tsx';
import StartLine from './views/StartLine.tsx';
import HoldingNothing from './views/HoldingNothing.tsx';
import HoldingCoral from './views/HoldingCoral.tsx';
import HoldingAlgae from './views/HoldingAlgae.tsx';
import HoldingBoth from './views/HoldingBoth.tsx';
import Park from './views/Park.tsx';
import StartClimb from './views/StartClimb.tsx';
import FinishClimb from './views/FinishClimb.tsx';
import Checklist from './views/Checklist.tsx';
import HumanFeedback from './views/HumanFeedback.tsx';
import DevResources from './dev/DevResources.tsx';
import Layout from './common/Layout.tsx';

function App() {
  return (
    <Layout>
      <img src="images/logo.png" alt="Runnymede Robotics" width="50%" />
      <h1>Team 1310 Runnymede Robotics Data Scouting App</h1>
      <DevResources />

      <p>Here are some designs of what the app might look like someday.</p>

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
    </Layout>
  );
}

export default App;
