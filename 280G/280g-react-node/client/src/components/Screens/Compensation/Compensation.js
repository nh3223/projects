import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { formatISO } from 'date-fns';

import LoadExecutive from '../../Loaders/LoadExecutive';
import StartDate from './StartDate/StartDate';
import BasePeriodCompensation from './AnnualCompensation/BasePeriodCompensation';
import FirstYearPayments from './FirstYearPayments/FirstYearPayments';
import ExecutiveHeader from '../../Navigation/ExecutiveHeader';
import { executiveState, basePeriodCompensationState, firstYearPaymentsState, startDateState } from '../../../recoil/executive';
import { editExecutive } from '../../../api/executive';
import { getYears, getCompensation } from '../../../utilities/getCompensation';

const Compensation = () => {

  const { id } = useParams();

  const executive = useRecoilValue(executiveState(id));
  const [ startDate, setStartDate ] = useRecoilState(startDateState(id));
  const [ firstYearPayments, setFirstYearPayments ] = useRecoilState(firstYearPaymentsState(id));
  const [ basePeriodCompensation, setBasePeriodCompensation ] = useRecoilState(basePeriodCompensationState(id));
  const [ completed, setCompleted ] = useState({});
  const basePeriodCompensationRef = useRef(basePeriodCompensation);

  console.log('startDate', startDate);
  console.log('executive', executive);

  const startDateHandlers = {
    change: async (date) => {
      setStartDate(date);
      const updates = { startDate: formatISO(date) }
      await editExecutive(updates);
      setCompleted({ ...completed, startDate: true });
    },
    edit: () => setCompleted({ ...completed, startDate: false })
  };

  const basePeriodCompensationHandlers = {
    change: ({ target: { name, value }}) => {
      const year = Number(name);
      setBasePeriodCompensation({ ...basePeriodCompensation, [year]: value });
    },
    edit: (e) => {
      const year = Number(e.target.name);
      setCompleted({ ...completed, basePeriodCompensation: { ...basePeriodCompensation, [year]: false } });
    },
    submit: async (year, compensation) => {
      const updates = { ...basePeriodCompensation, [year]: compensation };
      await editExecutive(updates);
      setCompleted({ ...completed, basePeriodCompensation: { ...basePeriodCompensation, [year]: true } });
    }
  };

  const firstYearPaymentHandlers = {
    change: (e) => setFirstYearPayments(e.target.value),
    edit: () => setCompleted({ ...completed, firstYearPayments: false }),
    submit: async (payments) => {
      const updates = { firstYearPayments: payments };
      await editExecutive(updates);
      setCompleted({ ...completed, firstYearPayments: true });
    }
  };

  useEffect(() => {
    if (JSON.stringify(basePeriodCompensation) !== JSON.stringify(basePeriodCompensationRef.current)) {
      basePeriodCompensationRef.current = basePeriodCompensation;
    }
  }, [basePeriodCompensation]);

  useEffect(() => {
    const startDateCompleted = (startDate) ? true : false;
    const firstYearPaymentsCompleted = (firstYearPayments) ? true : false;
    const compensationCompleted = {};
    for (const year in basePeriodCompensation) {
      compensationCompleted[year] = (basePeriodCompensation[year]) ? true : false;
    }
    setCompleted({
      startDate: startDateCompleted,
      firstYearPayments: firstYearPaymentsCompleted,
      basePeriodCompensation: compensationCompleted
    });
  }, [startDate, firstYearPayments, basePeriodCompensation, setCompleted])

  useEffect(() => {
    const years = (startDate) ? (getYears(startDate)) : [];
    const compensation = getCompensation(years, basePeriodCompensationRef);
    setBasePeriodCompensation(compensation);
  }, [startDate, setBasePeriodCompensation]);

  console.log('basePeriodCompensation', basePeriodCompensation);

  return (
    <>
      <ExecutiveHeader executiveId={ id } />
      <LoadExecutive executiveId={ id } />
      <h1>Executive: { executive.name }</h1>
      <StartDate startDate={ startDate } completed={ completed.startDate } handlers={ startDateHandlers } />
      <BasePeriodCompensation  basePeriodCompensation={ basePeriodCompensation } startDate={ startDate } completed={ completed.basePeriodCompensation } handlers={ basePeriodCompensationHandlers } />
      <FirstYearPayments firstYearPayments={ firstYearPayments } completed={ completed.firstYearPayments } handlers={ firstYearPaymentHandlers } />        
    </>  
  );
};
export default Compensation;