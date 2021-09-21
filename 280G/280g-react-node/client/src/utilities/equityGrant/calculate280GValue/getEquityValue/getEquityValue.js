import { getOptionValue } from './getOptionValue'

export const getEquityValue = (transactionData, vestingData, equityGrantData) => {

  const { transactionPrice } = transactionData;
  const { shares } = vestingData;
  const { grantType } = equityGrantData;

  return (grantType === 'Restricted Stock') ? transactionPrice * shares : getOptionValue(transactionData, vestingData, equityGrantData) * shares;

};
  