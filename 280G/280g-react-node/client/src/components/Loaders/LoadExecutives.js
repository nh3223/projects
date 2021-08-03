import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { executiveIdsState } from '../../recoil/executive';
import { fetchExecutives } from '../../api/executive';

import LoadExecutive from './LoadExecutive';
import Loading from './Loading';

const LoadExecutives = ({ companyId }) => {
  
  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState);
  const [ loadComplete, setLoadComplete ] = useState(false);

   useEffect(() => {
    
    const getExecutiveIds = async () => {
      const executives = await fetchExecutives(companyId);
      setExecutiveIds(executives.map((executive) => executive._id));
      setLoadComplete(true);
    };

    if (companyId && executiveIds.length === 0) getExecutiveIds();

  }, [companyId, executiveIds.length, setExecutiveIds ]);

  return (loadComplete)
    ? executiveIds.map((id) => <LoadExecutive key={ id } executiveId={ id } />)
    : <Loading componentMessage="Executives . . ." />

};

export default LoadExecutives;