import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { restrictedStockGrantState } from '../../../recoil/restrictedStock';

import { parse } from '../../../utilities/formatDate';
import { editGrant } from '../../../api/restrictedStock';
import { allTrue } from '../../../utilities/checkObject';
import { defaultNew, defaultOld } from '../../../utilities/restrictedStock';

import GrantDate from './GrantDate/GrantDate';
import Shares from './Shares/Shares';
import VestingStartDate from './VestingStartDate/VestingStartDate';
import ChangeOfControl from './ChangeOfControl/ChangeOfControl';
import Acceleration from './Acceleration/Acceleration';
import Cliff from './Cliff/Cliff';
import Remainder from './Remainder/Remainder';

const RestrictedStockGrant = ({ add, handleCreate }) => {

  const { restrictedStockId } = useParams();

  const [ grant, setGrant ] = useRecoilState(restrictedStockGrantState(restrictedStockId));
  const [ completed, setCompleted ] = useState({ });

  const handlers = {
    change: async (name, value) => setGrant({ ...grant, [name]: value }),
    edit: ({ target: { name } }) => setCompleted({ ...completed, [name]: false }),
    submit: async ({ target: { name } }) => {
      if (restrictedStockId) await editGrant(restrictedStockId, grant);
      setCompleted({ ...completed, [name]: true })
    }
  };

  useEffect(() => {
    const create = async () => await handleCreate(grant);
    if (add && allTrue(completed)) create();
  }, [add, completed, grant, handleCreate])

  useEffect(() => (add) ? setCompleted(defaultNew) : setCompleted(defaultOld), [add, setCompleted]);

  return (
    <>
      <GrantDate name="grantDate" grantDate={ parse(grant.grantDate) } completed={ completed.grantDate } handlers={ handlers }/>
      <Shares name="numberShares" numberShares = { grant.numberShares } completed={ completed.numberShares } handlers={ handlers } />
      <VestingStartDate name="vestingStartDate" vestingStartDate={ parse(grant.vestingStartDate) } completed={ completed.vestingStartDate } handlers={ handlers }/>
      <ChangeOfControl name="changeOfControl" changeOfControl={ grant.changeOfControl } completed={ completed.changeOfControl } handlers={ handlers }/>
      <Acceleration grant={ grant } completed={ completed.accelerationPercentage } handlers={ handlers }/>
      <Cliff grant={ grant } completed={ completed } handlers={ handlers } />
      <Remainder grant={ grant } completed={ completed } handlers={ handlers } />
    </>
  );


}

export default RestrictedStockGrant;