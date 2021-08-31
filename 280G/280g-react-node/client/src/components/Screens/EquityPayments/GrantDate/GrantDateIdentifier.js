import React from 'react';
import { format } from 'date-fns';

const GrantDateIdentifier = ({ grantDate, handleEdit }) => (
  <>
    <h2>{ format(grantDate, 'd MMM yyyy') }</h2>
    <button onClick={ handleEdit }>Edit</button>
  </>
);

export default GrantDateIdentifier;