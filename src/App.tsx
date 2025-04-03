import AppLayout from './common/AppLayout.tsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './views/Home.tsx';
import NotFound from './views/NotFound.tsx';
import DevResources from './dev/DevResources.tsx';
import { Suspense, useState } from 'react';
import { match_select } from './modes/match_select.ts';
import { checklist } from './modes/checklist.ts';
import { match_config } from './modes/match_config.ts';
import { start_line } from './modes/start_line.ts';
import { holding_nothing } from './modes/holding_nothing.ts';
import { holding_both } from './modes/holding_both.ts';
import { holding_algae } from './modes/holding_algae.ts';
import { holding_coral } from './modes/holding_coral.ts';
import { human_feedback } from './modes/human_feedback.ts';
import FieldLayout from './common/FieldLayout.tsx';
import { endgame } from './modes/endgame.ts';
import GameContext from './context/GameContext.tsx';
import { GS, DEFAULT_GAME_STATE } from './context/GS.ts';
import { penalties } from './modes/penalties.ts';
import { tournament_select } from './modes/tournament_select.ts';
import logoUrl from '/src/assets/images/logo.png';
import titleUrl from '/src/assets/images/title.png';
import automapBlueUrl from '/src/assets/requirements/fields/automap-blue.png';
import automapRedUrl from '/src/assets/requirements/fields/automap-red.png';
import reefscapeBlueUrl from '/src/assets/requirements/fields/reefscape-blue.png';
import reefscapeRedUrl from '/src/assets/requirements/fields/reefscape-red.png';
import Sync from './views/Sync.tsx';
import RBTournamentAdmin from './views/RBTournamentAdmin.tsx';
import RBScheduleAdmin from './views/RBScheduleAdmin.tsx';
import TournamentReports from './views/TournamentReports.tsx';
import TeamSummaryReports from './views/TeamSummaryReports.tsx';
import RavenBrainSyncConnection from './views/sub/RavenBrainSyncConnection.tsx';
import QuickComment from './views/QuickComment.tsx';
import Unsync from './views/Unsync.tsx';

export const myBasename = '/2025-data-scouting-app'; // todo: fixme: set up constants for this

function App() {
  const [gamestate, setGamestate] = useState<GS>(DEFAULT_GAME_STATE);

  const pictures = [
    logoUrl,
    titleUrl,
    automapBlueUrl,
    automapRedUrl,
    reefscapeBlueUrl,
    reefscapeRedUrl,
  ];
  pictures.forEach(picture => {
    const img = new Image();
    img.src = picture;
  });

  const saveGamestate = (state: GS) => {
    setGamestate(state);
    const gamestateString = JSON.stringify(state);
    localStorage.setItem('rrCurrentGamestate', gamestateString);
    console.log('saved gamestate to', state);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route
          path="/sync"
          element={<RavenBrainSyncConnection loginMode={false} />}
        >
          <Route path="" element={<Sync />} />
        </Route>
        <Route
          path="admin/"
          element={<RavenBrainSyncConnection loginMode={false} />}
        >
          <Route path="tournament" element={<RBTournamentAdmin />} />
          <Route path="schedule" element={<RBScheduleAdmin />} />
          <Route path="unsync" element={<Unsync />} />
        </Route>
        <Route path="reports/">
          <Route path="tournament" element={<TournamentReports />} />
          <Route path="team" element={<TeamSummaryReports />} />
        </Route>
        <Route path="dev" element={<DevResources />} />
        <Route path="game/" element={<FieldLayout />}>
          <Route path="start-line" element={<start_line.view />} />
          <Route path="holding-nothing" element={<holding_nothing.view />} />
          <Route path="holding-coral" element={<holding_coral.view />} />
          <Route path="holding-algae" element={<holding_algae.view />} />
          <Route path="holding-both" element={<holding_both.view />} />
          <Route path="endgame" element={<endgame.view />} />
          <Route path="penalties" element={<penalties.view />} />
        </Route>
        <Route path="/tournament-select" element={<tournament_select.view />} />
        <Route path="/match-select" element={<match_select.view />} />
        <Route path="/match-config" element={<match_config.view />} />
        <Route path="/checklist" element={<checklist.view />} />
        <Route path="/human-feedback" element={<human_feedback.view />} />
        <Route path="/quick-comment" element={<QuickComment />} />
        <Route path="*" element={<NotFound />} />
      </Route>,
    ),
    {
      basename: myBasename,
    },
  );
  return (
    <GameContext.Provider value={{ gamestate, saveGamestate }}>
      <Suspense fallback={<p>Loading...</p>}>
        <RouterProvider router={router} />
      </Suspense>
    </GameContext.Provider>
  );
}

export default App;
