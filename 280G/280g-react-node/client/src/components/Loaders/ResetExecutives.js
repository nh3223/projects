import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { executiveIdsState } from '../../recoil/executive';

const ResetExecutives = () => {
  
  const setExecutiveIds = useSetRecoilState(executiveIdsState);
  
  useEffect(() => {
    setExecutiveIds([]); 
  }, [setExecutiveIds])

  return null;

};

export default ResetExecutives;