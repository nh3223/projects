import React, { useRef, useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { editCompensation } from '../../../../api/compensation/editCompensation';
import { basePeriodCompensationState, startDateState } from '../../../../recoil/compensation';
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
    console.log('basePeriodCompensation', updatedCompensation, reconvertedCompensation);
    setCompensation(updatedCompensation);
    setBasePeriodCompensation(reconvertedCompensation);
    await editCompensation(executiveId, reconvertedCompensation);
  };

  useEffect(() => {

    if (referenceDate.current !== startDate) {
      const years = (getYears(startDate));
      setBasePeriodCompensation(reconvertCompensation(getCompensation(years, basePeriodCompensation)));
      referenceDate.current = startDate;
    }

  }, [startDate, basePeriodCompensation, setBasePeriodCompensation]);

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