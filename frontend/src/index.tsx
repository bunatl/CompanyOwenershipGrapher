import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { CompannyContextComponent } from './contexts/CompanyContext';

ReactDOM.render(
  <React.StrictMode>
    <CompannyContextComponent >
      <App />
    </CompannyContextComponent>
  </React.StrictMode>,
  document.getElementById('root')
);

