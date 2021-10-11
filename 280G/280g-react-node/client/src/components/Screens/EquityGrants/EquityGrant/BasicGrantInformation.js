import React from 'react';

import BasicGrantInformationLayout from '../../../Elements/Layouts/BasicGrantInformationLayout';
import GrantDate from '../GrantDate/GrantDate';
import Shares from '../Shares/Shares';
import ExercisePrice from '../ExercisePrice/ExercisePrice';
import { useRecoilValue } from 'recoil';
import { grantTypeState } from '../../../../recoil/equityGrant';

const BasicGrantInformation = ({ grantId }) => {

  const grantType = useRecoilValue(grantTypeState(grantId));

  return (

    <BasicGrantInformationLayout>
      <GrantDate grantId={ grantId } />
      <Shares grantId={ grantId } />
      { (grantType === 'Option') ? <ExercisePrice grantId={ grantId } /> : null }
    </BasicGrantInformationLayout>
  
  );

};

export default BasicGrantInformation;
