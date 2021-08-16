import React from 'react';

import StyledTable from './StyledTable';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({ headings, tableData }) => (
  <StyledTable>
    <TableHeader headings={ headings } />
    <TableBody tableData={ tableData } />
  </StyledTable>
);

export default Table;