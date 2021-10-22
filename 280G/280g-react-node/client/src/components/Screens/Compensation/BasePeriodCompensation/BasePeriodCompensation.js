import React, { useRef, useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { editExecutive } from '../../../../api/executive/editExecutive';
import { basePeriodCompensationState, startDateState } from '../../../../recoil/executive';
import { getYears } from '../../../../utilities/compensation/getYears/getYears';
import { getCompensation } from '../../../../utilities/compensation/getCompensation/getCompensation';
import { convertCompensation, reconvertCompensation } from '../../../../utilities/compensation/convertCompensation/convertCompensation';

import SubTitle from '../../../Elements/TextElements/SubTitle/SubTitle';
import BasePeriodCompensationYear from './BasePeriodCompensationYear';

const BasePeriodCompensation = ({ executiveId }) => {
  
  const startDate = useRecoilValue(startDateState(executiveId));
  const [ basePeriodCompensation, setBasePeriodCompensation ] = useRecoilState(basePeriodCompensationState(executiveId));
  const [ compensation, setCompensation ] = useState(convertCompensation(basePeriodCompensation))
  const referenceDate = useRef(null);

  const handleSubmit = async (year, annualCompensation) => {
    const updatedCompensation = { ...compensation, [year]: annualCompensation};
    const reconvertedCompensation = reconvertCompensation(updatedCompensation);
    await editExecutive(executiveId, reconvertedCompensation);
    setCompensation(updatedCompensation);
    setBasePeriodCompensation(reconvertedCompensation);
  };

  useEffect(() => {

    if (referenceDate.current !== startDate) {
      const years = (getYears(startDate));
      const compensationYears = getCompensation(years, basePeriodCompensation);
      setCompensation(convertCompensation(compensationYears));
      setBasePeriodCompensation(compensationYears);
      
      referenceDate.current = startDate;
    }

  }, [startDate, basePeriodCompensation, setCompensation, setBasePeriodCompensation]);

  return (
    <>
      <SubTitle text="Annual Compensation" />
      { basePeriodCompensation.map((year) => (
          <BasePeriodCompensationYear key={ year.year } year={ year.year } compensation={ year.compensation } handleSubmit={ handleSubmit } />
        ))
      }
    </>
  );

};

export default BasePeriodCompensation;