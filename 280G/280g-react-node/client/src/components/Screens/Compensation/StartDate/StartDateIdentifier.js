import React from 'react';

import { formatDate } from '../../../../utilities/formatDate';

import Identifier from '../../../Elements/Identifier/Identifier';

const StartDateIdentifier = ({ startDate, handleEdit }) => (
  <Identifier text={ formatDate(startDate) } name="startDate" handleEdit={ handleEdit } />
);

export default StartDateIdentifier;