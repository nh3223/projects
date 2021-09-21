import React from 'react';

import CheckboxLayout from '../../../Elements/Layouts/CheckboxLayout';
import ChangeOfControl from '../ChangeOfControl/ChangeOfControl';
import Acceleration from '../Acceleration/Acceleration';

export const CheckboxInformation = ({ grantId }) => (

  <CheckboxLayout>
    <ChangeOfControl grantId={ grantId } />
    <Acceleration grantId={ grantId } />
  </CheckboxLayout>

);

export default CheckboxInformation;