import AppLayout from './common/AppLayout.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import CoralContext from './context/CoralContext.tsx';
import TeamContext from './context/TeamContext.tsx';
import PhaseContext from './context/PhaseContext.tsx';
import { Phase } from './common/phase.ts';
import AllianceContext from './context/AllianceContext.tsx';
import GameContext, { DEFAULT_GAME_STATE } from './context/GameContext.tsx';
import { GS } from './context/GS.ts';

function App() {
  const [preloaded, setPreloaded] = useState<boolean>(false);
  const defaultPreloadState = { preloaded, setPreloaded };
  const [teamNumber, setTeamNumber] = useState<number>(0);
  const defaultTeamState = { teamNumber, setTeamNumber };
  const [currentPhase, setCurrentPhase] = useState<Phase>(Phase.pre_match);
  const defaultPhaseState = { currentPhase, setCurrentPhase };
  const [isRed, setIsRed] = useState(true);
  const defaultAllianceState = { isRed, setIsRed };
  const [gamestate, setGamestate] = useState<GS>(DEFAULT_GAME_STATE);
  const defaultGameStateContext = { gamestate, setGamestate };

  return (
    <GameContext.Provider value={defaultGameStateContext}>
      <AllianceContext.Provider value={defaultAllianceState}>
        <PhaseContext.Provider value={defaultPhaseState}>
          <TeamContext.Provider value={defaultTeamState}>
            <CoralContext.Provider value={defaultPreloadState}>
              <Suspense fallback={<p>Loading...</p>}>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<AppLayout />}>
                      <Route index element={<Home />} />
                      <Route path="dev" element={<DevResources />} />
                      <Route path="game/" element={<FieldLayout />}>
                        <Route
                          path="start-line"
                          element={<start_line.view />}
                        />
                        <Route
                          path="holding-nothing"
                          element={<holding_nothing.view />}
                        />
                        <Route
                          path="holding-coral"
                          element={<holding_coral.view />}
                        />
                        <Route
                          path="holding-algae"
                          element={<holding_algae.view />}
                        />
                        <Route
                          path="holding-both"
                          element={<holding_both.view />}
                        />
                        <Route path="endgame" element={<endgame.view />} />
                      </Route>
                      <Route
                        path="match-select"
                        element={<match_select.view />}
                      />{' '}
                      <Route
                        path="match-config"
                        element={<match_config.view />}
                      />
                      <Route path="checklist" element={<checklist.view />} />
                      <Route
                        path="human-feedback"
                        element={<human_feedback.view />}
                      />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </Suspense>
            </CoralContext.Provider>
          </TeamContext.Provider>
        </PhaseContext.Provider>
      </AllianceContext.Provider>
    </GameContext.Provider>
  );
}

export default App;
