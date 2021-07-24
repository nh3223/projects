import { parseISO, formatISO, format } from 'date-fns';

export const parse = (date) => parseISO(date);

export const stringify = (date) => formatISO(date);

export const formatDate = (date) => format(date, 'd MMM yyyy');