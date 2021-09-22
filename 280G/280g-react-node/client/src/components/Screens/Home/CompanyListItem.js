import React from 'react';

import ListItem from '../../Elements/ListItem/ListItem';

const CompanyListItem = ({ company, handleDelete }) => {

  const { companyId, companyName } = company;
  const path = `/company/${companyId}`;
  const buttonText = 'Delete Company';

  return <ListItem path={ path } text={ companyName } buttonText={ buttonText } handleDelete={ handleDelete } />

};

export default CompanyListItem;