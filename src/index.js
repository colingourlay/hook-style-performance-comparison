import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

const root = document.querySelector(`[data-react-1k-divs-root]`);

function init() {
  render(<App />, root);
}

init();

if (module.hot) {
  module.hot.accept('./components/App', () => {
    try {
      init();
    } catch (err) {
      import('./components/ErrorBox').then(exports => {
        const ErrorBox = exports.default;
        render(<ErrorBox error={err} />, root);
      });
    }
  });
}
