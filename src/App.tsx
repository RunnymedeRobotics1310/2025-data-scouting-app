import AppLayout from './common/AppLayout.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home.tsx';
import NotFound from './views/NotFound.tsx';
import DevResources from './dev/DevResources.tsx';
import { Suspense } from 'react';
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

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="dev" element={<DevResources />} />
            <Route path="game/" element={<FieldLayout />}>
              <Route path="start-line" element={<start_line.view />} />
              <Route
                path="holding-nothing"
                element={<holding_nothing.view />}
              />
              <Route path="holding-coral" element={<holding_coral.view />} />
              <Route path="holding-algae" element={<holding_algae.view />} />
              <Route path="holding-both" element={<holding_both.view />} />
              <Route path="endgame" element={<endgame.view />} />
            </Route>
            <Route path="match-select" element={<match_select.view />} />{' '}
            <Route path="match-config" element={<match_config.view />} />
            <Route path="checklist" element={<checklist.view />} />
            <Route path="human-feedback" element={<human_feedback.view />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
