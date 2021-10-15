import React from 'react';

import StyledHeader from '../../../Elements/Navigation/StyledHeader';
import NavigationTitle from '../../../Elements/TextElements/NavigationTitle/NavigationTitle';

const Header = ({ companyId }) => {

  const title = 'M&A 280G Analysis';

  return (

    <StyledHeader>
      <NavigationTitle text={ title } />
    </StyledHeader>
  
  );

};

export default Header;