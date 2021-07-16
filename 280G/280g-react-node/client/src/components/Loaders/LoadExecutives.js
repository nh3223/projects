import React, { useEffect } from 'react';
import { useRecoilState } from "recoil";

import { executiveIdsState } from '../../recoil/executive';
import { fetchExecutives } from '../../api/executive';

import LoadExecutive from './LoadExecutive';

const LoadExecutives = ({ companyId }) => {
  
  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState);

  useEffect(() => {
    
    const getExecutiveIds = async () => {
      const executives = await fetchExecutives(companyId);
      setExecutiveIds(executives.map((executive) => executive._id));
    };

    if (companyId && executiveIds.length === 0) getExecutiveIds();

  }, [companyId, executiveIds.length, setExecutiveIds ]);

  return executiveIds.map((id) => <LoadExecutive key={ id } executiveId={ id } />) 

};

export default LoadExecutives;