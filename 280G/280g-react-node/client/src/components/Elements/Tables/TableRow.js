import React from 'react';

import StyledTableRow from './StyledTableRow';
import TableItem from './TableItem';

const TableRow = ({ row }) => (
  <StyledTableRow>
    { row.map((item) => <TableItem key={ item.id } item={ item } /> ) }
  </StyledTableRow>
);

export default TableRow;