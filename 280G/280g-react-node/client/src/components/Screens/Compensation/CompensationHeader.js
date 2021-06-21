import React, { useState, useEffect } from 'react';
import useRecoilValue from 'recoil';

import { executivesState } from '../../../recoil/atoms/executive';

const CompensationHeader = ( { executiveId } ) => {

  const executives = useRecoilValue(executivesState);
  const [ executive, setExecutive ] = useState({ });
  
  useEffect(() => {
    setExecutive(executives.filter((exec) => (exec._id === executiveId)))
  }, [executiveId, executives, setExecutive]);

  return <h1>{ executive.name }</h1>;
};

export default CompensationHeader;