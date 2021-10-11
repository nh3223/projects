import React from 'react';
import { useRecoilValue } from 'recoil';

import { projectNameState } from '../../../../recoil/company';

import StyledHeader from '../../../Elements/Navigation/StyledHeader';
import Title from '../../../Elements/TextElements/Title/Title';

const Header = ({ companyId }) => {

  const projectName = useRecoilValue(projectNameState(companyId));

  const title = (projectName) ? `${projectName} 280G Analysis` : 'M&A 280G Analysis';

  return (

    <StyledHeader>
      <Title text={ title } />
    </StyledHeader>
  
  );

};

export default Header;