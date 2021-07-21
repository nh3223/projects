import { useEffect } from "react";
import { useResetRecoilState } from "recoil";

import { executiveIdsState } from '../../recoil/executive';

const ResetExecutives = () => {
  
  const resetExecutiveIds = useResetRecoilState(executiveIdsState);
  
  resetExecutiveIds();
  
  return null;

};

export default ResetExecutives;