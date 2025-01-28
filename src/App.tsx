import Layout from './common/Layout.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home.tsx';
import Checklist from './views/Checklist.tsx';
import MatchSelect from './views/MatchSelect.tsx';
import NotFound from './views/NotFound.tsx';
import DevResources from './dev/DevResources.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dev" element={<DevResources />} />
          <Route path="checklist" element={<Checklist />} />
          <Route path="match-select" element={<MatchSelect />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
