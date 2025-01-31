import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import mermaid from 'mermaid';
import App from './App.tsx';
import './index.css';

// Initialize mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'neutral',
  securityLevel: 'loose',
  flowchart: {
    curve: 'basis',
    padding: 20
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);