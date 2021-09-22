import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './components/Styles/GlobalStyle';
import { theme } from './components/Styles/theme';

import AppRouter from './routers/AppRouter';

const App = () => (
  <RecoilRoot>
    <ThemeProvider theme={ theme } >
      <GlobalStyle />
      <AppRouter />
    </ThemeProvider>
  </RecoilRoot>
);

export default App;
