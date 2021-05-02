import React from 'react';
import ReactDOM from 'react-dom';

import './styles/App.css';
import './styles/index.css';
import GlobalProvider from './context/GlobalProvider';

const App = () => (
  <React.StrictMode>
    <GlobalProvider />
  </React.StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root'));

// let hasRendered = false;

// export const renderApp = () => {
//   console.log('renderApp before if');
//   if (!hasRendered) {
//     console.log('renderApp in if');
//     ReactDOM.render(<App />, document.getElementById('root'));
//     hasRendered = true;
//   }
// };

// console.log('Before Render');

// renderApp();