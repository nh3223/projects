import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderItem = ({ path, text }) => (
  <NavLink to={ path }>{ text }</NavLink>
);

export default HeaderItem;