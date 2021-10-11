import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { parse } from '../../../../utilities/date/date';

const DateForm = ({ name, date, handleChange, handleSubmit }) => <DatePicker aria-label={ name } name={ name } selected={ (date) ? parse(date) : new Date() } onChange={ handleChange } />;

export default DateForm;