import React from 'react';
import { useRecoilValue } from 'recoil';

import { useLoadCompany } from '../../../hooks/useLoadCompany';
import { useLoadExecutives } from '../../../hooks/useLoadExecutives';
import { executiveIdsState } from '../../../recoil/executive';

import Loading from './Loading';
import LoadExecutive from './LoadExecutive';

const LoadProject = ({ companyId }) => {

  const executiveIds = useRecoilValue(executiveIdsState(companyId));

  const { status: companyStatus, error: companyError } = useLoadCompany(companyId);
  const { status: executivesStatus, error: executivesError } = useLoadExecutives(companyId);

  const error = (companyError || executivesError) ? `${companyError}, ${executivesError}` : '';

  if (companyStatus === 'loading' || executivesStatus === 'loading') return <Loading component="Project" error={ error } />;

  return (
    <>
      { executiveIds.map((executiveId) => <LoadExecutive key={ executiveId } executiveId={ executiveId } />) }
    </>
  );

};

export default LoadProject;