import React from 'react';
import { NavLink } from 'react-router-dom';

import StyledTab from './StyledTab';

const Tab = ({ path, text }) => (
  
  <NavLink to={ path }>
    <StyledTab>
      { text }
    </StyledTab>
  </NavLink>

);

export default Tab;