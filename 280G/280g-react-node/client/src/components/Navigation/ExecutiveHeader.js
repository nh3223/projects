import React from 'react';
import { NavLink } from 'react-router-dom';

const ExecutiveHeader = ({ executiveId }) => (
  <>
    <NavLink to={ `/executive/${executiveId}` }>Executive Summary</NavLink>
    <NavLink to={ `/executive/${executiveId}/compensation` }>Compensation</NavLink>
    <NavLink to={ `/executive/${executiveId}/non-equity-payments` }>Non-Equity Payments</NavLink>
    <NavLink to={ `/executive/${executiveId}/options` }>Options</NavLink>
    <NavLink to={ `/executive/${executiveId}/restricted-stock` }>Restricted Stock</NavLink>
  </>
);

export default ExecutiveHeader;