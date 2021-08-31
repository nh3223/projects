import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const VestingStartDateForm = ({ vestingStartDate, handleChange }) => (
  <>
    <h2>Vesting Start Date: </h2>
    <DatePicker selected={ vestingStartDate } onChange={ handleChange } />
  </>
);

export default VestingStartDateForm;