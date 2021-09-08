import React from 'react';
import { useRecoilValue } from 'recoil';
import { useLoadProjectNames } from '../../hooks/useLoadProjectNames';
import { projectNamesState } from '../../recoil/company';

import Loading from '../Loaders/Loading';
import SideBar from '../Elements/Navigation/SideBar';
import Description from '../Elements/TextElements/Description/Description';

const ProjectSidebar = () => {

  const projectNames = useRecoilValue(projectNamesState);
  
  const { loading, error } = useLoadProjectNames();

  if (loading) return <Loading component="Project Sidebar" error={ error } />

  return (
    <SideBar>
      { projectNames.map((name) => <Description text={ name } />) }
    </SideBar>
  );

};

export default ProjectSidebar;