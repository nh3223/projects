import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const TransactionDateForm = ({ date, handleChange }) => (
  <>
    <h2>Transaction Date: </h2>
    <DatePicker selected={ date } onChange={ handleChange } />
  </>
);

export default TransactionDateForm;