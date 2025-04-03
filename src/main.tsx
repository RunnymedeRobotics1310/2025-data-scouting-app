import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './assets/css/global.css';
import './assets/css/typography.css';
import './assets/css/colors.css';
import './assets/css/layout.css';
import './assets/css/components.css';
import './assets/css/report.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
