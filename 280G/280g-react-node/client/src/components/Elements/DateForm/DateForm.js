import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { parse, stringify } from '../../../utilities/formatDate';

const DateForm = ({ name, date, handleChange, handleSubmit }) => {

  date = (date) ? parse(date) : new Date();

  const processChange = (date) => handleChange(name, stringify(date));

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <form name={ name } onSubmit={ submit }>
      <DatePicker name={ name } selected={ date } onChange={ processChange } onBlur={ submit }/>
    </form>
  );
};
export default DateForm;