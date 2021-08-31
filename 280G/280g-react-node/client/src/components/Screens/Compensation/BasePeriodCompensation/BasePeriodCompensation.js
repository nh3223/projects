import React, { useRef, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { editCompensation } from '../../../../api/compensation/editCompensation';
import { basePeriodCompensationState, startDateState } from '../../../../recoil/compensation';
import { getYears } from '../../../../utilities/compensation/getYears/getYears';
import { getCompensation } from '../../../../utilities/compensation/getCompensation/getCompensation';
import { reconvertCompensation } from '../../../../utilities/compensation/convertCompensation/convertCompensation';

import SubTitle from '../../../Elements/TextElements/SubTitle/SubTitle';
import BasePeriodCompensationYear from './BasePeriodCompensationYear';

const BasePeriodCompensation = ({ executiveId }) => {
  
  const startDate = useRecoilValue(startDateState(executiveId));
  const [ basePeriodCompensation, setBasePeriodCompensation ] = useRecoilState(basePeriodCompensationState(executiveId));
  const referenceDate = useRef(null);

  const handleSubmit = async (year, annualCompensation) => {
    const compensation = { ...basePeriodCompensation, [year]: annualCompensation };
    setBasePeriodCompensation(compensation);
    await editCompensation(reconvertCompensation(compensation));
  };

  useEffect(() => {

    if (referenceDate.current !== startDate) {
      const years = (getYears(startDate));
      setBasePeriodCompensation(getCompensation(years, basePeriodCompensation));
      referenceDate.current = startDate;
    }

  }, [startDate, basePeriodCompensation, setBasePeriodCompensation]);

  return (
    <>
      <SubTitle text="Annual Compensation" />
      { Object.entries(basePeriodCompensation).map(([year, compensation]) => (
          <BasePeriodCompensationYear key={ year } year={ year } compensation={ compensation } handleSubmit={ handleSubmit } />
        ))
      }
    </>
  );

};

export default BasePeriodCompensation;