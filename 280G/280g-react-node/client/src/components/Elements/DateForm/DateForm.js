import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DateForm = ({ name, date, handleChange, handleSubmit }) => {

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <form name={ name } onSubmit={ submit }>
      <DatePicker name={ name } selected={ date } onChange={ handleChange } onBlur={ submit }/>
    </form>
  );
};
export default DateForm;