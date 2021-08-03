import React from 'react';

import { formatDate } from '../../../../utilities/formatDate';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import DateForm from '../../../Elements/DateForm/DateForm';


const StartDate = ({ name, startDate, completed, handlers: { change, edit, submit }}) => {

  console.log('StartDate', startDate );
  
  return (
  <>
    <Description text="Employment Start Date" />
    { completed
    ? <Identifier name={ name } text={ formatDate(startDate) }  handleEdit={ edit }/>
    : <DateForm name={ name } date={ startDate } handleChange={ change } handleSubmit={ submit }/>
    } 
  </>
);
  };
export default StartDate;