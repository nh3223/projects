import React from 'react';

import CompanyName from './CompanyName/CompanyName';
import TransactionDate from './TransactionDate/TransactionDate';
import DealPrice from './DealPrice/DealPrice';
import Executives from './Executives/Executives';

const CompanyInformation = () => (
  <>
    <h2>Company Information</h2>
    <CompanyName />
    <TransactionDate />
    <DealPrice />
    <Executives />
  </>
);

export default CompanyInformation;