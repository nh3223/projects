import React from 'react';

import StyledTableBody from './StyledTableBody';
import TableRow from './TableRow';

const TableBody = ({ tableData }) => (
  <StyledTableBody>
    { tableData.map((row) => <TableRow key={ row.id } row={ row } /> ) }
  </StyledTableBody>
);

export default TableBody;