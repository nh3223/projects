import React, { useState } from 'react';

import App from '../App';
import GlobalContext from './GlobalContext';

const GlobalProvider = () => {

  const [ executives, setExecutives ] = useState([]);
  
  return (
    <GlobalContext.Provider value = {{ executives, setExecutives }}>
      <App />
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;