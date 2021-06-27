import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const StartDateForm = ({ startDate, handleChange }) => (
  <>
    <h2>Employment Start Date: </h2>
    <DatePicker selected={ startDate } onChange={ handleChange } />
  </>
);

export default StartDateForm;