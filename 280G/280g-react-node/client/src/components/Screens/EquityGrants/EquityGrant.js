import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { restrictedStockGrantState } from '../../../recoil/restrictedStock';

import { editGrant } from '../../../api/restrictedStock';
import { allTrue } from '../../../utilities/checkObject';
import { defaultNew, defaultOld } from '../../../utilities/equityGrant/restrictedStock';

import GrantDate from './GrantDate/GrantDate';
import Shares from './Shares/Shares';
import VestingStartDate from './VestingStartDate/VestingStartDate';
import ChangeOfControl from './ChangeOfControl/ChangeOfControl';
import Acceleration from './Acceleration/Acceleration';
import Cliff from './Cliff/Cliff';
import Remainder from './Remainder/Remainder';
import CompanyHeader from '../../Navigation/CompanyHeader';
import ExecutiveHeader from '../../Navigation/ExecutiveHeader';

const RestrictedStockGrant = ({ add, handleCreate }) => {

  const { companyId, executiveId, restrictedStockId } = useParams();

  const [ grant, setGrant ] = useRecoilState(restrictedStockGrantState(restrictedStockId));
  const [ completed, setCompleted ] = useState({ });

  const handlers = {
    change: (name, value) => setGrant({ ...grant, [name]: value }),
    changeAcceleration: (name, value) => {
      console.log('changeacceleration', value);
      setGrant({ ...grant, acceleration: value });
      setCompleted({ ...completed, accelerationPercentage: !value });
    },
    changeCliff: (name, value) => {
      setGrant({ ...grant, cliff: value });
      setCompleted({ ...completed, cliffDuration: !value, cliffPercentage: !value });
    },
    edit: ({ target: { name } }) => setCompleted({ ...completed, [name]: false }),
    submit: async ({ target: { name } }) => {
      if (restrictedStockId) await editGrant(restrictedStockId, grant);
      setCompleted({ ...completed, [name]: true })
    }
  };

  useEffect(() => {
    const create = async () => await handleCreate(grant);  
    console.log('rsgrant useeffect', add, completed);
    if (add && allTrue(completed)) create();
  }, [add, completed, grant, handleCreate])

  useEffect(() => (add) ? setCompleted(defaultNew) : setCompleted(defaultOld), [add, setCompleted]);

  console.log('Restricted Stock Grant', grant, completed)

  return (
    <>
      <CompanyHeader companyId={ companyId } />
      <ExecutiveHeader executiveId={ executiveId } />
      <GrantDate name="grantDate" grantDate={ grant.grantDate } completed={ completed.grantDate } handlers={ handlers }/>
      <Shares name="numberShares" numberShares = { grant.numberShares } completed={ completed.numberShares } handlers={ handlers } />
      <VestingStartDate name="vestingStartDate" vestingStartDate={ grant.vestingStartDate } completed={ completed.vestingStartDate } handlers={ handlers }/>
      <ChangeOfControl name="changeOfControl" changeOfControl={ grant.changeOfControl } completed={ completed.changeOfControl } handlers={ handlers }/>
      <Acceleration grant={ grant } completed={ completed.accelerationPercentage } handlers={ handlers }/>
      <Cliff grant={ grant } completed={ completed } handlers={ handlers } />
      <Remainder grant={ grant } completed={ completed } handlers={ handlers } />
    </>
  );


}

export default RestrictedStockGrant;