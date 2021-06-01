import React, { useState } from 'react';

import App from '../../App';
import GlobalContext from '../Context';

const GlobalProvider = () => {
  
  const contextVariables = {
    
  }

  return (
    <GlobalContext.Provider value = {contextVariables}>
      <App />
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;