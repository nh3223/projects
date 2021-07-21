import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DateForm = ({ date, handleChange }) => {

  console.log(date);

  return (
    <DatePicker selected={ date } onChange={ handleChange } />
  );

};

export default DateForm;