import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const StartDateForm = ({ date, handleChange }) => (
  <>
    <h2>Employment Start Date: </h2>
    <DatePicker selected={ date } onChange={ handleChange } />
  </>
);

export default StartDateForm;