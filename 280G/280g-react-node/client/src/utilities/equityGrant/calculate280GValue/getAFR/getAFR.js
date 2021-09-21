import { convertToDailyRateFromSemiAnnual } from "../convertToDailyRateFromSemiAnnual/convertToDailyRateFromSemiAnnual";

//----------------------------------------------------------------------------------------------------------------------------------
// Interest rates below to be set via React data input component and/or automatically generated through scraping
// AFRs (Applicable Federal Rates) for  are pulled from Rev. Rul. 2021-16 (September 2021) and are semi-annual 120 percent rates

const shortTermYears = 3
const shortTermAFR = 0.002;
const midTermAFR = 0.0103;

const shortTermAFRDays = convertToDailyRateFromSemiAnnual(shortTermAFR);
const midTermAFRDays = convertToDailyRateFromSemiAnnual(midTermAFR);

//----------------------------------------------------------------------------------------------------------------------------------

export const getAFR = ({ years }) => (years <= shortTermYears) ? shortTermAFRDays : midTermAFRDays;