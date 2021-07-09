import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatISO } from 'date-fns';

import GrantDateForm from './GrantDate/GrantDateForm';
import SharesForm from './Shares/SharesForm';
import VestingStartDateForm from './VestingStartDate/VestingStartDateForm';
import ChangeOfControlForm from './ChangeOfControl/ChangeOfControlForm';
import AccelerationForm from './Acceleration/AccelerationForm';
import VestingScheduleForm from './VestingSchedule/VestingScheduleForm';

import { createGrant } from '../../../api/restrictedStock'
import { isCompleted } from '../../../utilities/isCompleted';

const defaultCompleted = {
  grantDate: false,
  numberShares: false,
  vestingStartDate: false,
  acceleration: false,
  vestingSchedule: false
}

const defaultAcceleration = {
  percentage: 100,
  method: 'first'
};

const defaultVestingSchedule = {
  cliff: 25,
  rate: 'monthly',
  periods: 36
};

const RestrictedStockForm = () => {

  const [ grantDate, setGrantDate ] = useState(new Date());
  const [ numberShares, setNumberShares ] = useState('');
  const [ vestingStartDate, setVestingStartDate] = useState(new Date());
  const [ changeOfControl, setChangeOfControl ] = useState(false);
  const [ acceleration, setAcceleration ] = useState(defaultAcceleration);
  const [ vestingSchedule, setVestingSchedule ] = useState(defaultVestingSchedule);
  const [ completed, setCompleted ] = useState(defaultCompleted);

  const history = useHistory();

  const changeHandlers = {
    numberShares: (e) => setNumberShares(e.target.value),
    changeOfControl: (e) => setChangeOfControl(e.target.checked)
  };

  const submitHandlers = {
    grantDate: (date) => {
      setGrantDate(date);
      setCompleted({ ...completed, grantDate: true });
    },
    numberShares: () => setCompleted({ ...completed, numberShares: true }),
    vestingStartDate: (date) => {
      setVestingStartDate(date);
      setCompleted({ ...completed, vestoingStartDate: true});
    },
    acceleration: (accelerationData) => {
      setAcceleration(accelerationData);
      setCompleted({ ...completed, acceleration: true });
    },
    vestingSchedule: (vestingData) => {
      setVestingSchedule(vestingData);
      setCompleted({ ...completed, vestingSchedule: true });
    }
  };

  useEffect(() => {

    const createNewGrant = async () => {
      const newGrant = {
        grantDate: formatISO(grantDate),
        numberShares,
        vestingStartData: formatISO(vestingStartDate),
        changeOfControl,
        acceleration,
        vestingSchedule
      };
      const savedGrant = await createGrant(newGrant);
      history.push(`/restricted-stock/${savedGrant._id}`);
      setCompleted(defaultCompleted);
    };

    if (isCompleted(completed)) createNewGrant();

  }, [completed, grantDate, numberShares, vestingStartDate, changeOfControl, acceleration, vestingSchedule, history, setCompleted]);


  return (
    <>
      <GrantDateForm grantDate={ grantDate } handleChange={ submitHandlers.grantDate } />
      <SharesForm numberShares={ numberShares } handleChange = { changeHandlers.numberShares } handleSubmit={ submitHandlers.numberShares } />
      <VestingStartDateForm vestingStartDate={ vestingStartDate } handleChange={ submitHandlers.vestingStartDate } />
      <ChangeOfControlForm changeOfControl={ changeOfControl } handleChange={ changeHandlers.changeOfControl } />
      <AccelerationForm handleSubmit={ submitHandlers.acceleration } />
      <VestingScheduleForm handleSubmit={ submitHandlers.vestingSchedule } />
    </>
  );

};

export default RestrictedStockForm;