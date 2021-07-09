import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { grantState } from '../../../recoil/restrictedStock';

import GrantDate from './GrantDate/GrantDate';
import Shares from './Shares/Shares';
import VestingStartDate from './VestingStartDate/VestingStartDate';
import ChangeOfControl from './ChangeOfControl/ChangeOfControl';
import Acceleration from './Acceleration/Acceleration';
import VestingSchedule from './VestingSchedule/VestingSchedule';
import { editGrant } from '../../../api/restrictedStock';

const RestrictedStockGrant = () => {

  const { id } = useParams();

  const [ grant, setGrant ] = useRecoilState(grantState(id));
  const [ vesting, setVesting ] = useRecoilState(grantState(id));

  const handleEdit = async (update) => {
    (Object.keys(update)[0] === 'vestingSchedule') ? setVesting({ ...vesting, update}) : setGrant({ ...grant, update });
    await editGrant(update);
  };

  return (
    <>
      <GrantDate grantDate={ grant.grantDate } handleEdit={ handleEdit }/>
      <Shares />
      <VestingStartDate />
      <ChangeOfControl />
      <Acceleration />
      <VestingSchedule />
    </>
  );


}

export default RestrictedStockGrant;