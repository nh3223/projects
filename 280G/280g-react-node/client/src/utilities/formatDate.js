import { parseISO, formatISO, format } from 'date-fns';

export const parse = (date) => parseISO(date);

export const stringify = (date) => formatISO(date);

export const formatDate = (date) => {
  console.log('Date', date, typeof(date));
  return format(parse(date), 'd MMM yyyy');
};