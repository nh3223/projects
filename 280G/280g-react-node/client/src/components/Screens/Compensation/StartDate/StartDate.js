import React from 'react';

import { parse, formatDate } from '../../../../utilities/formatDate';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import DateForm from '../../../Elements/DateForm/DateForm';


const StartDate = ({ startDate, completed, handlers: { change, edit, submit }}) => {
  
  const date = parse(startDate);
  
  return (
    <>
      <Description text="Employment Start Date" />
      { completed
      ? <Identifier text={ formatDate(date) } name="startDate" handleEdit={ edit }/>
      : <DateForm name="startDate" date={ date } handleChange={ change } handleSubmit={ submit }/>
      } 
    </>
  );

};

export default StartDate;