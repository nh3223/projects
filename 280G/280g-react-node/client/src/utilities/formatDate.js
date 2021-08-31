import { parseISO, formatISO, format } from 'date-fns';

export const parse = (dateString) => parseISO(dateString);

export const stringify = (date) => formatISO(date);

export const formatDate = (dateString) => format(parse(dateString), 'd MMM yyyy');