import React from 'react';

import ListItem from '../../Elements/ListItem/ListItem';

const CompanyListItem = ({ company, handleDelete }) => {

  const { _id: companyId, projectName } = company;
  const path = `/company/${companyId}`;
  const buttonText = 'Delete Company';

  return <ListItem path={ path } text={ projectName } id={ companyId } buttonText={ buttonText } handleDelete={ handleDelete } />

};

export default CompanyListItem;