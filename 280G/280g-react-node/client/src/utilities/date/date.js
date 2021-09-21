import { parseISO, formatISO, format, addMonths, addQuarters, addYears, differenceInDays, differenceInMonths } from 'date-fns';
import differenceInYears from 'date-fns/differenceInYears';

export const parse = (dateString) => parseISO(dateString);

export const stringify = (date) => formatISO(date);

export const formatDate = (dateString) => format(parse(dateString), 'd MMM yyyy');

export const addMonth = (date, number) => stringify(addMonths(parse(date), number));

export const addQuarter = (date, number) => stringify(addQuarters(parse(date), number));

export const addYear = (date, number) => stringify(addYears(parse(date), number));

export const differenceDays = (oldDate, newDate) => differenceInDays(parse(oldDate), parse(newDate));

export const getPeriod = (oldVestingDate, newVestingDate) => ({
  days: differenceDays(oldVestingDate, newVestingDate),
  months: differenceInMonths(parse(oldVestingDate), parse(newVestingDate)),
  years: differenceInYears(parse(oldVestingDate), parse(newVestingDate))
});
