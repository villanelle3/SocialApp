import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TweetsComponent } from './tweets';

// Renderiza o componente App no elemento com o id "root" (se existir)
const appEl = document.getElementById('root');
if (appEl) {
  ReactDOM.createRoot(appEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Renderiza o componente TweetsComponent no elemento com o id "social-app" (se existir)
const e = React.createElement
const tweetsEl = document.getElementById('social-app');
if (tweetsEl) {
  console.log(tweetsEl.dataset)
  ReactDOM.createRoot(tweetsEl).render(e(TweetsComponent, tweetsEl.dataset), tweetsEl);
}

reportWebVitals();
