import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DateForm = ({ date, handleChange }) => (
  <DatePicker selected={ date } onChange={ handleChange } />
);

export default DateForm;