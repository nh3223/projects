import React, { useState } from 'react';
import { formatISO } from 'date-fns';

import GrantDateIdentifier from './GrantDateIdentifier';
import GrantDateForm from './GrantDateForm';

const GrantDate = ({ grantDate, handleEdit }) => {
  
  const [ edit, setEdit ] = useState(false);

  const toggleEdit = () => setEdit(true);

  const handleChange = async (date) => {
    setEdit(false);
    await handleEdit({ grantDate: formatISO(date) })
  }

  return (
    <>
      { edit
      ? <GrantDateForm grantDate={ grantDate } handleChange={ handleChange } />
      : <GrantDateIdentifier grantDate={ grantDate } toggleEdit={ toggleEdit }/>
      } 
    </>
  );
};

export default GrantDate;