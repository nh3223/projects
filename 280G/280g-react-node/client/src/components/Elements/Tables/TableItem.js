import React from 'react';

import StyledTableItem from './StyledTableItem';

const TableItem = ({ item }) => (
  <StyledTableItem>
    { item }
  </StyledTableItem>
);

export default TableItem;