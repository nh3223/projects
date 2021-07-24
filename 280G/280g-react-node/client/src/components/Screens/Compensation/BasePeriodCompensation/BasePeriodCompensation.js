import React from 'react';

import SubTitle from '../../../Elements/SubTitle/SubTitle';
import BasePeriodCompensationYear from './BasePeriodCompensationYear';

const BasePeriodCompensation = ({ basePeriodCompensation, completed, handlers }) => (
  <>
    <SubTitle text="Annual Compensation" />
    { Object.entries(basePeriodCompensation).map(([year, compensation]) => (
        <BasePeriodCompensationYear key={ year } completed={ completed.year } year={ year } compensation={ compensation } handlers={ handlers } />
      ))
    }
  </>
);

export default BasePeriodCompensation;