import { getBlackScholes } from './getBlackScholes';

export const getOptionValue = (transactionData, vestingData, equityGrantData) => {

  const { transactionPrice, transactionDate } = transactionData;
  const { newVestingDate } = vestingData;
  const { exercisePrice } = equityGrantData;

  const spread = Math.max(0, transactionPrice - exercisePrice);

  //----------------------------------------------------------------------------------------------------------------------------------

  // Rev. Proc. 2003-68 provides tables for valuing stock options for purposes of Section 280G under certain circumstances.
  // Automatically incorporating the tables will be a future feature to be added.  To the extent that an option valuation is
  // needed (i.e., when options are not being cashed out), the Black-Scholes value (which would be used if the tables do not 
  // apply) will be used as the option valuation.

  const optionValue = getBlackScholes(transactionData, equityGrantData);

  //----------------------------------------------------------------------------------------------------------------------------------

  return (newVestingDate <= transactionDate) ? spread : optionValue;

};