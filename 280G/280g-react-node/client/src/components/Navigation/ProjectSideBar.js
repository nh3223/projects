import React from 'react';
import { useRecoilValue } from 'recoil';
import { useLoadCompanies } from '../../hooks/useLoadCompanies';
import { companiesState } from '../../recoil/company';

import Loading from '../Loaders/Loading';
import SideBar from '../Elements/Navigation/SideBar';
import Description from '../Elements/TextElements/Description/Description';

const ProjectSidebar = () => {

  const companies = useRecoilValue(companiesState);
  
  const { status, error } = useLoadCompanies();

  if (status === 'loading') return <Loading component="Project Sidebar" error={ error } />

  return (
    <SideBar>
      { companies.map((company) => <Description text={ company.projectName } />) }
    </SideBar>
  );

};

export default ProjectSidebar;