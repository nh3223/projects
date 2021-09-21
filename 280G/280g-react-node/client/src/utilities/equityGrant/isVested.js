import { parse } from '../date/date';

export const isVested = (vestingDate, transactionDate) => parse(vestingDate) < parse(transactionDate);