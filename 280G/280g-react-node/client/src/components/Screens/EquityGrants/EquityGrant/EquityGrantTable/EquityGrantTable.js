import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { editGrant } from '../../../../../api/equityGrant/editGrant';

import { useSetVestingData } from '../../../../../hooks/useSetVestingData';
import { total280GValueState, vestingScheduleState } from '../../../../../recoil/equityGrant';

import MultiLineLayout from '../../../../Elements/Layouts/MultiLineLayout';
import SubTitle from '../../../../Elements/TextElements/SubTitle/SubTitle';
import VestingRow from './VestingRow';

const EquityGrantTable = ({ companyId, grantId }) => {

  useSetVestingData(companyId, grantId);

  const [ vestingSchedule, setVestingSchedule ] = useRecoilState(vestingScheduleState(grantId));
  const equityGrant280GValue = useRecoilValue(total280GValueState({ companyId, grantId }));

  const handleChange = async (vestingRow, vestingRowIndex) => {
    const newVestingSchedule = vestingSchedule.map((vestingDate, index) => (index === vestingRowIndex) ? vestingRow : vestingDate)
    setVestingSchedule(newVestingSchedule)
    await editGrant(grantId, { vestingSchedule: newVestingSchedule})
  };

  const equityGrant280GValueText = `Value of equity grant for purposes of Section 280G: $${equityGrant280GValue}`;

  console.log(equityGrant280GValue);

  return (
    <MultiLineLayout>
      <SubTitle text={ equityGrant280GValueText } />
      { vestingSchedule.map((vestingDate, index) => (
          <VestingRow key={ index } companyId={ companyId } grantId={ grantId } index={ index } vestingDate={ vestingDate } handleChange={ handleChange } />
        ))}
    </MultiLineLayout>
  );

};

export default EquityGrantTable;