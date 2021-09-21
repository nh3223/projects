import { addMonth, differenceDays } from "../../../date/date";

//-------------------------------------------------------------------------------------------------

// The following values used in the black scholes calculation will be added as specific inputs or
// as automatically generated values in a future feature update.

const riskFreeRate = 0.0003;
const volatility = 0.70;
const originalOptionTermMonths = 120;

//------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------

// The following formula for the normal cumulative distribution function is derived from 
// https://www.math.ucla.edu/~tom/distributions/normal.html?

const normalCDF = (x) => {

  const t = 1 / (1 + 0.2316419 * Math.abs(x))
  const d = 0.3989423 * Math.exp( -x * x / 2)
  
  const probability = d * t * (0.3193815 + t * ( -0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  
  return (x > 0) ? 1 - probability : probability;

};

//--------------------------------------------------------------------------------------------------

export const getBlackScholes = (transactionData, equityGrantData) => {

  const { transactionPrice, transactionDate } = transactionData;
  const { grantDate, exercisePrice } = equityGrantData;
  
  const optionExpirationDate = addMonth(grantDate, originalOptionTermMonths);
  const remainingOptionTerm = differenceDays(optionExpirationDate, transactionDate) / 365

  // d1 and d2 are variable names used in the Black-Scholes Formula

  const d1Numerator = Math.log(transactionPrice / exercisePrice) + remainingOptionTerm * (riskFreeRate + volatility**2 / 2)
  const d1Denominator = volatility * Math.sqrt(remainingOptionTerm);
  
  const d1 = d1Numerator / d1Denominator;
  const d2 = d1 - d1Denominator;

  const Nd1 = normalCDF(d1);
  const Nd2 = normalCDF(d2);

  const blackScholesValue = Nd1 * transactionPrice - Nd2 * exercisePrice * Math.exp(-riskFreeRate * remainingOptionTerm)

  return blackScholesValue;
};