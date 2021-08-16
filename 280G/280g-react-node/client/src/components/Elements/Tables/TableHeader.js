import React from 'react';

import StyledHeader from './StyledHeader';
import StyledHeaderRow from './StyledHeaderRow';
import ColumnHeading from './ColumnHeading';

const TableHeader = ({ headings }) => (
  <StyledHeader>
    <StyledHeaderRow>
      { headings.map((heading) => <ColumnHeading key={ heading } heading={ heading } /> ) }
    </StyledHeaderRow>
  </StyledHeader>
);

export default TableHeader;