import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { parse } from '../../../utilities/formatDate';

import LoadExecutive from '../../Loaders/LoadExecutive';
import StartDate from './StartDate/StartDate';
import BasePeriodCompensation from './BasePeriodCompensation/BasePeriodCompensation';
import FirstYearPayments from './FirstYearPayments/FirstYearPayments';
import ExecutiveHeader from '../../Navigation/ExecutiveHeader';
import { executiveState, } from '../../../recoil/executive';
import { editExecutive } from '../../../api/executive';
import { getYears, getCompensation } from '../../../utilities/getCompensation';

const Compensation = () => {

  const { executiveId } = useParams();

  const [ executive, setExecutive ] = useRecoilState(executiveState(executiveId));
  const [ completed, setCompleted ] = useState({});
  const onLoad = useRef(true);
  const startDate = useRef(executive.startDate);

  const handlers = {
    change: (name, value) => setExecutive({ ...executive, [name]: value }),
    edit: ({ target: { name }}) => setCompleted({ ...completed, [name]: false }),
    submit: async ({ target: { name }}) => {
      await editExecutive({ [name]: executive[name] });
      setCompleted({ ...completed, [name]: true });
    }
  };

  const basePeriodCompensationHandlers = {
    change: (name, value) => setExecutive({ ...executive, basePeriodCompensation: { ...executive.basePeriodCompensation, [name]: value }}),
    edit: ({target: { name }}) => setCompleted({ ...completed, basePeriodCompensation: { ...executive.basePeriodCompensation, [name]: false }}),
    submit: async ({Target: { name }}) => {
      const basePeriodCompensation = []
      for (const [year, compensation] in Object.entries(executive.basePeriodCompensation)) {
        basePeriodCompensation.push({ year, compensation });
      } 
      await editExecutive({ basePeriodCompensation });
      setCompleted({ ...completed, basePeriodCompensation: { ...executive.basePeriodCompensation, [name]: true } });
    }
  };

  useEffect(() => {    
    if (onLoad) {  
      const basePeriodCompleted = {};
      basePeriodCompleted['startDate'] = (executive.startDate) ? true : false;
      basePeriodCompleted['firstYearPayments'] = (executive.firstYearPayments) ? true : false;
      for (const [year, compensation] in Object.entries(executive.basePeriodCompensation)) {
        basePeriodCompleted[year] = (compensation) ? true : false;
      }
      setCompleted(basePeriodCompleted);
      onLoad.current = false;
    }
  }, [executive, setCompleted])

  useEffect(() => {
    if ((startDate.current !== executive.startDate) && executive.startDate) {
      const years = (getYears(executive.startDate));
      const basePeriodCompensation = getCompensation(years, executive.basePeriodCompensation);
      setExecutive({ ...executive, basePeriodCompensation });
      startDate.current = executive.startDate;
    }
  }, [executive, setExecutive]);

  return (
    <>
      <ExecutiveHeader executiveId={ executiveId } />
      <LoadExecutive executiveId={ executiveId } />
      <h1>Executive: { executive.name }</h1>
      <StartDate name="startDate" startDate={ executive.startDate } completed={ completed.startDate } handlers={ handlers } />
      <BasePeriodCompensation  basePeriodCompensation={ executive.basePeriodCompensation } handlers={ basePeriodCompensationHandlers } />
      <FirstYearPayments name="firstYearPayments" firstYearPayments={ executive.firstYearPayments } completed={ completed.firstYearPayments } handlers={ handlers } />        
    </>  
  );
};
export default Compensation;