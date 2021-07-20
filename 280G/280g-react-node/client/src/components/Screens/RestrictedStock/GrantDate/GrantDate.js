import React from 'react';
import { parseISO } from 'date-fns';

import GrantDateIdentifier from './GrantDateIdentifier';
import GrantDateForm from './GrantDateForm';

const GrantDate = ({ grantDate, completed, handlers: { change, edit } }) => {

  const date = parseISO(grantDate);

  return (
    <>
      <h2>Grant Date:</h2>
      { (completed)
      ? <GrantDateForm grantDate={ date } handleChange={ change } />
      : <GrantDateIdentifier grantDate={ date } handleEdit={ edit }/>
      } 
    </>
  );

};

export default GrantDate;