import React from 'react';

import SubTitle from '../../../Elements/SubTitle/SubTitle';
import BasePeriodCompensationYear from './BasePeriodCompensationYear';

const BasePeriodCompensation = ({ basePeriodCompensation, handlers }) => (
  <>
    <SubTitle text="Annual Compensation" />
    { basePeriodCompensation.map((basePeriodYear) => (
        (basePeriodYear.year)
        ? <BasePeriodCompensationYear key={ basePeriodYear.index } basePeriodYear={ basePeriodYear } handlers={ handlers } />
        : null
      ))
    }
  </>
);

export default BasePeriodCompensation;