import React, { useState, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { restrictedStockGrantState } from '../../../recoil/restrictedStock';
import { formatISO } from 'date-fns';

import GrantDate from './GrantDate/GrantDate';
import Shares from './Shares/Shares';
import VestingStartDate from './VestingStartDate/VestingStartDate';
import ChangeOfControl from './ChangeOfControl/ChangeOfControl';
import Acceleration from './Acceleration/Acceleration';
import VestingDetails from './VestingDetails/VestingDetails';
import { editGrant } from '../../../api/restrictedStock';
import { allTrue } from '../../../utilities/checkObject';

const RestrictedStockGrant = ({ grantId, add, removeGrantId, handleCreate }) => {

  const { id } = useParams();

  const [ grant, setGrant ] = useRecoilState(restrictedStockGrantState(id));
  const [ completed, setCompleted ] = useState({ });
  const edit = useRef(false);

  const history = useHistory();

  const grantDateHandlers = {
    change: (date) => {
      setGrant({ ...grant, grantDate: formatISO(date) });
      setCompleted({ ...completed, grantDate: true });
      edit.current = false;
    },
    edit: () => {
      setCompleted({ ...completed, grantDate: false })
      edit.current = true;
    }
  };

  const shareHandlers = {
    change: (e) => setGrant({ ...grant, numberShares: e.target.value }),
    edit: () => {
      setCompleted({ ...completed, numberShares: false });
      edit.current = true;
    },
    submit: () => {
      setCompleted({ ...completed, numberShares: true });
      edit.current = false;
    }
  };

  const vestingDateHandlers = {
    change: (date) => {
      setGrant({ ...grant, vestingStartDate: formatISO(date) });
      setCompleted({ ...completed, vestingStartDate: true });
      edit.current = false;
    },
    edit: () => {
      setCompleted({ ...completed, vestingStartDate: false })
      edit.current = true;
    }
  };

  const changeOfControlHandlers = {
    change: (e) => setGrant({ ...grant, changeOfControl: e.target.checked })
  };

  const accelerationHandlers = {
    percentageChange: (e) => setGrant({ ...grant, percentageAcceleration: e.target.value }),
    methodChange: (e) => {
      setGrant({ ...grant, accelerationMethod: e.target.value });
      setCompleted({ ...completed, accelerationMethod: true });
    },
    percentageEdit: () => {
      setCompleted({ ...completed, percentageAcceleration: false });
      edit.current = true;
    },
    methodEdit: () => {
      setCompleted({ ...completed, accelerationMethod: false });
      edit.current = true;
    },
    submit: (e) => {
      e.preventDefault();
      setCompleted({ ...completed, percentageAcceleration: true })
    }
  };

  const vestingDetailHandlers = {
    editCliff: () => {
      setCompleted({ ...completed, cliff: false });
      edit.current = true;
    },
    editRemainder: () => {
      setCompleted({ ...completed, remainder: false });
      edit.current = false;
    },
    cliffChange: (e) => setGrant({ ...grant, vestingDetails: { ...grant.vestingDetails, cliff: e.target.checked }}),
    cliffPercentageChange: (e) => setGrant({ ...grant, vestingDetails: { ...grant.vestingDetails, cliffPercentage: e.target.value }}),
    cliffMonthsChange: (e) => setGrant({ ...grant, vestingDetails: { ...grant.vestingDetails, cliffMonths: e.target.value }}),
    remainderPeriodsChange: (e) => setGrant({ ...grant, vestingDetails: { ...grant.vestingDetails, remainderPeriods: e.target.value }}),
    remainderTypeChange: (e) => setGrant({ ...grant, vestingDetails: { ...grant.vestingDetails, remainderType: e.target.checked }}),
    cliffPercentageSubmit: () => setCompleted({ ...completed, cliff: true }),
    cliffMonthsSubmit: () => setCompleted({ ...completed, cliff: true }),
    remainderPeriodsSubmit: () => setCompleted({ ...completed, remainder: true })
  };

  useEffect(() => {
    const create = async () => await handleCreate(grant);
    const edit = async () => {
      await editGrant(grant);
      edit.current = false;
    };
    if (add && allTrue(completed)) create();
    if (!add && edit.current && allTrue(completed)) edit();
  }, [add, completed, grant, handleCreate])

  useEffect(() => (add) ? setCompleted({ name: false, title: false }) : setCompleted({ name: true, title: true }), [add, setCompleted]);

  return (
    <>
      <GrantDate grantDate={ grant.grantDate } completed={ completed.grantDate } handlers={ grantDateHandlers }/>
      <Shares shares = { grant.numberShares } completed={ completed.numberShares } handlers={ shareHandlers } />
      <VestingStartDate vestingStartDate={ grant.vestingStartDate } completed={ completed.vestingStartDate } handlers={ vestingDateHandlers }/>
      <ChangeOfControl changeOfControl={ grant.changeOfControl } completed={ completed.changeOfControl } handlers={ changeOfControlHandlers }/>
      <Acceleration acceleration={ grant.percentageAcceleration } completed={ completed.acceleration } handlers={ accelerationHandlers }/>
      <VestingDetails vestingDetails={ grant.vestingDetails } completed={ completed.vestingDetails } handlers={ vestingDetailHandlers }/>
    </>
  );


}

export default RestrictedStockGrant;