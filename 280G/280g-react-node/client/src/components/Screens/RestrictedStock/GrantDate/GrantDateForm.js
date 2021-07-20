import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const GrantDateForm = ({ grantDate, handleChange }) => <DatePicker selected={ grantDate } onChange={ handleChange } />

export default GrantDateForm;