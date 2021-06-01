import React from 'react';
import { RecoilRoot } from 'recoil';


import AppRouter from './routers/AppRouter';

const App = () => (
  <RecoilRoot>
    <AppRouter />
  </RecoilRoot>
);

export default App;
