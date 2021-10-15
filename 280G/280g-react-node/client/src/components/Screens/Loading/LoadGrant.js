import React from 'react';

import { useLoadGrant } from '../../../hooks/useLoadGrant';
import Loading from './Loading';

const LoadGrant = ({ grantId }) => {

  const { status, error } = useLoadGrant(grantId);

  return (status === 'loading') ? <Loading component="Equity Grant" error={ error } /> : null

};

export default LoadGrant;